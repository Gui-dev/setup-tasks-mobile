import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface ICheckbox extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export const Checkbox = ({ title, checked, ...rest }: ICheckbox) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center mb-2"
      {...rest}
    >
      {
        checked
          ? <View className="items-center justify-center h-8 w-8 bg-green-500 rounded-lg">
            <Feather name="check" color={colors.white} size={20} />
          </View>
          : <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }
      <Text className="text-base text-white ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
