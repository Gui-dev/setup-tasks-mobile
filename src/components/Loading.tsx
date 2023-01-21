import { ActivityIndicator, View } from 'react-native'

export const Loading = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090A' }}>
      <ActivityIndicator size="large" color="#7C3AED" />
    </View>
  )
}
