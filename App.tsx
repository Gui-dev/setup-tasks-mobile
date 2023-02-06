import './src/lib/dayjs'
import { StatusBar } from 'expo-status-bar'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts
} from '@expo-google-fonts/inter'
import Toast from 'react-native-toast-message'

import { toastConfig } from './src/config/toastConfig'
import { Loading } from './src/components/Loading'
import { Routes } from './src/routes'

export default function App () {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Routes />
      <Toast config={toastConfig} />
    </>
  )
}
