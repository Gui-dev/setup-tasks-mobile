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
  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(dayInfo.possibleHabits.length, dayInfo.completedHabits.length)
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
    let completedHabits: string[] = []
    if (dayInfo?.completedHabits.includes(habitId)) {
      completedHabits = dayInfo!.completedHabits.filter(habit => habit !== habitId)
    } else {
      completedHabits = [...dayInfo!.completedHabits, habitId]
    }
    setDayInfo({
      possibleHabits: dayInfo!.possibleHabits,
      completedHabits
    })
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
        <View className="mt-6">
          {
            dayInfo?.possibleHabits
              ? dayInfo?.possibleHabits.map(habit => {
                return (
                  <Checkbox
                    key={habit.id}
                    title={habit.title}
                    onPress={() => handleToggleHabit(habit.id)}
                    checked={dayInfo.completedHabits.includes(habit.id)}
                  />
                )
              })
              : <HabitEmpty />
          }
        </View>
      </ScrollView>
    </View>
  )
}
