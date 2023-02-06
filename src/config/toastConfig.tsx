import { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message'
import colors from 'tailwindcss/colors'

export const toastConfig = {

  success: (props: any): any => {
    return (
      <BaseToast
        {...props}
        style={
          {
            backgroundColor: `${colors.zinc[900]}`,
            borderLeftColor: `${colors.green[500]}`
          }
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
          color: `${colors.zinc[200]}`
        }}
        text2Style={{
          fontSize: 15,
          fontWeight: '400',
          color: `${colors.zinc[400]}`
        }}
      />
    )
  },
  info: (props: any): any => {
    return (
      <InfoToast
        {...props}
        style={
          {
            backgroundColor: `${colors.zinc[900]}`,
            borderLeftColor: `${colors.blue[500]}`
          }
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
          color: `${colors.zinc[200]}`
        }}
        text2Style={{
          fontSize: 15,
          fontWeight: '400',
          color: `${colors.zinc[400]}`
        }}
      />
    )
  },
  error: (props: any): any => {
    return (
      <ErrorToast
        {...props}
        style={
          {
            backgroundColor: `${colors.zinc[900]}`,
            borderLeftColor: `${colors.pink[500]}`
          }
        }
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
          color: `${colors.zinc[200]}`
        }}
        text2Style={{
          fontSize: 15,
          fontWeight: '400',
          color: `${colors.zinc[400]}`
        }}
      />
    )
  }
}
