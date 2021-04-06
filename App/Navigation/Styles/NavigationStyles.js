import { StyleSheet } from 'react-native'
import { BLACK, WHITE, ORANGE } from '../../Themes/Colors'

export default StyleSheet.create({
  header: {
    backgroundColor: WHITE,
    color: WHITE
  },
  tintColor: {
    color: BLACK
  },
  headerCamera: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0
  },
  tintColorCamera: {
    color: WHITE
  },
  backTitleCamera: {
    padding: 20,
    backgroundColor: ORANGE
  }
})
