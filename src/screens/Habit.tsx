import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import Toast from 'react-native-toast-message'

import { BackButton } from '../components/BackButton'
import { Progressbar } from '../components/Progressbar'
import { Checkbox } from '../components/Checkbox'
import { Loading } from '../components/Loading'
import { api } from '../lib/api'
import { generateProgressPercentage } from '../lib/generate-progress-percentage'
import { HabitEmpty } from '../components/HabitEmpty'
import clsx from 'clsx'

interface IDayInfo {
  possibleHabits: Array<{
    id: string
    title: string
    created_at: Date
  }>
  completedHabits: Array<string>
}

interface IRouteParams {
  date: string
}

export const Habit = () => {
  const [dayInfo, setDayInfo] = useState<IDayInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const route = useRoute()
  const { date } = route.params as IRouteParams
  const parseDate = dayjs(date)
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')
  const isDateInPast = parseDate.endOf('day').isBefore(new Date())
  const habitsProgress = (dayInfo?.possibleHabits && dayInfo?.completedHabits) && dayInfo?.possibleHabits.length > 0
    ? generateProgressPercentage(
      dayInfo?.possibleHabits.length,
      dayInfo?.completedHabits.length)
    : 0

  const fetchHabits = useCallback(async () => {
    try {
      const { data } = await api.get('/day', {
        params: {
          date
        }
      })
      setDayInfo(data.habitDays)
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: 'Opsss',
        text2: 'Não foi possível carregar os hábitos'
      })
    } finally {
      setLoading(false)
    }
  }, [date])

  const handleToggleHabit = async (habitId: string) => {
    try {
      await api.patch(`/habits/${habitId}/toggle`)
      const isHabitAlreadyCompleted = dayInfo!.completedHabits.includes(habitId)
      let completedHabits: string[] = []
      if (isHabitAlreadyCompleted) {
        completedHabits = dayInfo!.completedHabits.filter(habit => habit !== habitId)
      } else {
        completedHabits = [...dayInfo!.completedHabits, habitId]
      }
      setDayInfo({
        possibleHabits: dayInfo!.possibleHabits,
        completedHabits
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Opsss',
        text2: 'Não foi possível atualizar o status do hábito'
      })
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        <Text className="text-base text-zinc-400 font-semibold lowercase mt-6">
          {dayOfWeek}
        </Text>
        <Text className="text-3xl text-white font-extrabold">
          {dayAndMonth}
        </Text>
        <Progressbar progress={habitsProgress} />
        <View className={clsx('mt-6', {
          'opacity-50': isDateInPast
        })}>
          {
            dayInfo?.possibleHabits
              ? dayInfo?.possibleHabits.map(habit => {
                return (
                  <Checkbox
                    key={habit.id}
                    title={habit.title}
                    onPress={() => handleToggleHabit(habit.id)}
                    checked={dayInfo.completedHabits && dayInfo.completedHabits.includes(habit.id)}
                    disabled={isDateInPast}
                  />
                )
              })
              : <HabitEmpty />
          }
        </View>
        {
          isDateInPast && (
            <Text className="text-base text-zinc-400 mt-10">
              Você não pode editar hábitos de uma data passada
            </Text>
          )
        }
      </ScrollView>
    </View>
  )
}
