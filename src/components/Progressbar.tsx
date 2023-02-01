import { View } from 'react-native'

interface IProgressbar {
  progress?: number
}

export const Progressbar = ({ progress = 0 }: IProgressbar) => {
  return (
    <View className="mt-4 h-3 w-full bg-zinc-700 rounded-xl">
      <View
        className="h-3 bg-violet-700 rounded-xl"
        style={{
          width: `${progress}%`
        }}
      />
    </View>
  )
}
