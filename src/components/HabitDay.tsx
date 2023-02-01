import { Dimensions, TouchableOpacity, TouchableOpacityProps } from 'react-native'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface IHabitDay extends TouchableOpacityProps { }

export const HabitDay = ({ ...rest }: IHabitDay) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="m-1 bg-zinc-900 border-2 border-zinc-800 rounded-lg"
      style={{
        height: DAY_SIZE,
        width: DAY_SIZE
      }}
      {...rest}
    />
  )
}
