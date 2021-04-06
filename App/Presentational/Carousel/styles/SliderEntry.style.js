import { StyleSheet, Dimensions, Platform } from 'react-native'
import { colors } from './index.style'
import { TEXT_PRIMARY_LARGE_BOLD, TEXT_DESCRIPTION_DEFAULT } from '../../../Themes/ApplicationStyles'

const IS_IOS = Platform.OS === 'ios'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window')

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100
  return Math.round(value)
}

const slideHeight = viewportHeight * 0.6
const slideWidth = wp(75)
const itemHorizontalMargin = wp(5)

export const sliderWidth = viewportWidth
export const itemWidth = slideWidth + itemHorizontalMargin * 2

const entryBorderRadius = 8

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    paddingVertical: 25,
    marginBottom: IS_IOS ? 0 : -1 // Prevent a random Android rendering issue
  },
  image: {
    marginTop: '10%',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'stretch'
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'transparent'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    ...TEXT_PRIMARY_LARGE_BOLD,
    textAlign: 'center'
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    ...TEXT_DESCRIPTION_DEFAULT,
    textAlign: 'center'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
})
