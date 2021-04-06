import { showMessage } from 'react-native-flash-message'
import { WHITE } from '../Themes/Colors'

const flash = {
  show: (message, duration = 4000, type = 'default') => {
    showMessage({
      message: message,
      duration: duration,
      type: type,
      backgroundColor: 'rgba(51, 51, 51, 0.75)',
      color: WHITE
    })
  }
}

export default flash
