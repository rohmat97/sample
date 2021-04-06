/* eslint-disable no-undef */
import { ToastAndroid, Platform } from 'react-native'

export default NativeToast = {
  show: (message) => {
    if (Platform.OS === 'android') {
      return ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }
}
