import { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'

export const New = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }
  console.log(weekDays)
  return (
    <View className="flex-1 px-8 pt-16 bg-background">
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        <Text className="text-3xl text-white font-extrabold mt-6">
          Criar Hábito
        </Text>
        <Text className="text-base text-white font-semibold mt-6">
          Qual é o seu comprometimento ?
        </Text>
        <TextInput
          className="text-white mt-3 pl-4 h-12 bg-zinc-800 rounded-lg focus:border-2 focus:border-green-600"
          placeholder="ex: Exercícios, estudar, alimentação, etc..."
          placeholderTextColor={colors.zinc[400]}
        />
        <Text className="text-base text-white font-semibold mt-4 mb-3">
          Qual é a recorrência ?
        </Text>
        {avaliableWeekDays.map((day, index) => {
          return (
            <Checkbox
              key={day}
              title={day}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          )
        })
        }

        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center justify-center mt-6 h-14 w-full bg-green-600 rounded-md"
        >
          <Feather name="check" color={colors.white} size={20} />
          <Text className="text-base font-semibold text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
