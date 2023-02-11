import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface IProgressbar {
  progress?: number
}

export const Progressbar = ({ progress = 0 }: IProgressbar) => {
  const sharedProgress = useSharedValue(progress)
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [sharedProgress, progress])

  return (
    <View className="mt-4 h-3 w-full bg-zinc-700 rounded-xl">
      <Animated.View
        className="h-3 bg-violet-700 rounded-xl"
        style={style}
      />
    </View>
  )
}
