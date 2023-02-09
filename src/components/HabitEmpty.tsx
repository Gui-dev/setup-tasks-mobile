import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'

export const HabitEmpty = () => {
  const { navigate } = useNavigation()

  const handleNavigationToNew = () => {
    navigate('new')
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-base text-zinc-400">
        Você ainda não está monitorando nenhum hábito, {' '}
        <Text
          className="text-base text-violet-400 underline active:text-violet-500"
          onPress={handleNavigationToNew}
        >
          comece criando um novo hábito
        </Text>
      </Text>
    </View>
  )
}
