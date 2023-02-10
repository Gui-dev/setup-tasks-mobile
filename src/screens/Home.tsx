import { useCallback, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { DAY_SIZE, HabitDay } from '../components/HabitDay'
import { Header } from '../components/Header'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { api } from '../lib/api'
import { AxiosError } from 'axios'
import { Loading } from '../components/Loading'
import dayjs from 'dayjs'

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export const Home = () => {
  const [summary, setSummary] = useState<SummaryProps>([])
  const [loading, setLoading] = useState(false)
  const { navigate } = useNavigation()
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const datesFromYearStart = generateDatesFromYearBeginning()
  const minimumSummaryDatesSize = 18 * 5
  const amountOfDatesToFill = minimumSummaryDatesSize - datesFromYearStart.length

  const handleNavigationToHabit = (date: string) => {
    navigate('habit', { date })
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/summary')
      setSummary(data.summaries)
    } catch (error) {
      const err = error as AxiosError
      Alert.alert('Opssss', 'Não foi possível carregar seus hábitos')
      console.log(err.stack)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <Header />
      <View
        className="flex-row mt-6 mb-2"
      >
        {
          weekDays.map((weekDay, index) => {
            return (
              <Text
                key={`${weekDay}-${index}`}
                className="font-bold text-zinc-400 text-xl text-center mx-1"
                style={{ width: DAY_SIZE }}
              >
                {weekDay}
              </Text>
            )
          })
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        <View
          className="flex-row flex-wrap"
        >
          {
            datesFromYearStart.map(date => {
              const dayWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
              })
              return (
                <HabitDay
                  key={date.toString()}
                  date={date}
                  amount={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  onPress={() => handleNavigationToHabit(date.toISOString())}
                />
              )
            })
          }

          {
            amountOfDatesToFill > 0 && Array
              .from({ length: amountOfDatesToFill })
              .map((value, index) => {
                return (
                  <View
                    key={String(index)}
                    className="m-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40"
                    style={{
                      height: DAY_SIZE,
                      width: DAY_SIZE
                    }}
                  />
                )
              })
          }
        </View>
      </ScrollView>
    </View>
  )
}
