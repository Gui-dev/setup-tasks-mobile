import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import LogoImage from './../assets/logo.svg'

export const Header = () => {
  const { navigate } = useNavigation()

  const handleNavigationToNew = () => {
    navigate('new')
  }

  return (
    <View className="flex-row items-center justify-between w-full">
      <LogoImage />
      <TouchableOpacity
        activeOpacity={0.7}
        className="flex-row items-center justify-center px-4 h-11 border border-violet-500 rounded"
        onPress={handleNavigationToNew}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text
          className="font-semibold text-base text-white ml-3"
        >
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  )
}
