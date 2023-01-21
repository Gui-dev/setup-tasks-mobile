import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts
} from '@expo-google-fonts/inter'

import { Loading } from './src/components/Loading'

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090A' }}>
      <Text>Hello World!</Text>
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </View>
  )
}
