import { Platform, TouchableNativeFeedback } from 'react-native'
import { LIGHT_GREY } from '../Themes/Colors'

const props = {
  useForeground: TouchableNativeFeedback.canUseNativeForeground()
}

if (Platform.OS === 'android') {
  if (Platform.Version >= 21) {
    props.background = TouchableNativeFeedback.Ripple(LIGHT_GREY)
  } else {
    props.background = TouchableNativeFeedback.SelectableBackground()
  }
}

export default props
