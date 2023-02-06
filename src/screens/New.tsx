import { useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import Toast from 'react-native-toast-message'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { api } from '../lib/api'

export const New = () => {
  const [weekDays, setWeekDays] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const avaliableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  const handleCreateNewHabit = async () => {
    try {
      setLoading(true)
      if (!title.trim()) {
        Toast.show({
          type: 'info',
          text1: 'Opsss',
          text2: 'Informe o nome do hábito'
        })
        return
      }
      if (weekDays.length === 0) {
        Toast.show({
          type: 'info',
          text1: 'Opsss',
          text2: 'você deve selecionar um ou mais dias'
        })
        return
      }
      await api.post('/habits', {
        title,
        weekDays
      })
      setTitle('')
      setWeekDays([])
      Toast.show({
        type: 'success',
        text1: 'Parabéns',
        text2: 'Hábito criado com sucesso'
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Opsss',
        text2: 'não foi possível criar um novo hábito'
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
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
        <Text className="text-3xl text-white font-extrabold mt-6">
          Criar Hábito
        </Text>
        <Text className="text-base text-white font-semibold mt-6">
          Qual é o seu comprometimento ?
        </Text>
        <TextInput
          className="text-white mt-3 pl-4 h-12 bg-zinc-900 rounded-lg border-2 border-zinc-800 focus:border-green-600"
          placeholder="ex: Exercícios, estudar, alimentação, etc..."
          placeholderTextColor={colors.zinc[400]}
          value={title}
          onChangeText={setTitle}
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
          onPress={handleCreateNewHabit}
        >
          {
            !loading
              ? <>
                <Feather name="check" color={colors.white} size={20} />
                <Text className="text-base font-semibold text-white ml-2">
                  Confirmar
                </Text>
              </>

              : <ActivityIndicator color={colors.white} size="large" />
          }

        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
