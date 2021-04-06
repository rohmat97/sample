import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

export const MARGIN_HORIZONTAL = 10
export const MARGIN_VERTICAL = 10
export const SECTION = 25
export const BASE_MARGIN = 10
export const DOUBLE_BASE_MARGIN = 20
export const SMALL_MARGIN = 5
export const DOUBLE_SECTION = 50
export const SCREEN_WIDTH = width
export const SCREEN_HEIGHT = height
export const HALF_SCREEN_HEIGHT = height / 2
export const HALF_SCREEN_WIDTH = width / 2
export const buttonRadius = 4

export const ICON = {
  tiny: 15,
  small: 20,
  medium: 30,
  large: 45,
  xl: 50
}

export const IMAGE = {
  small: 20,
  medium: 40,
  large: 60,
  logo: 200
}

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
