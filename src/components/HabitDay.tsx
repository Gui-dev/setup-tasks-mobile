import clsx from 'clsx'
import dayjs from 'dayjs'
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { generateProgressPercentage } from '../lib/generate-progress-percentage'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface IHabitDay extends TouchableOpacityProps {
  date: Date
  amount?: number
  completed?: number
}

export const HabitDay = ({ date, amount = 0, completed = 0, ...rest }: IHabitDay) => {
  const amountAccomplishedPercentage = amount > 0 ? generateProgressPercentage(amount, completed) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={clsx(
        'm-1 border-2 rounded-lg',
        {
          'bg-zinc-900 border-zinc-800': amountAccomplishedPercentage === 0,
          'bg-violet-900 border-violet-700': amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
          'bg-violet-800 border-violet-600': amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
          'bg-violet-700 border-violet-500': amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
          'bg-violet-600 border-violet-500': amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
          'bg-violet-500 border-violet-400': amountAccomplishedPercentage >= 80,
          'border-white border-4': isCurrentDay
        }
      )
      }
      style={{
        height: DAY_SIZE,
        width: DAY_SIZE
      }}
      {...rest}
    />
  )
}
