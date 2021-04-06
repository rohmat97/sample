import Fonts from './Fonts'
import { BASE_MARGIN, SECTION as SIZE_SECTION, DOUBLE_SECTION, DOUBLE_BASE_MARGIN, TINY_MARGIN } from './Metrics'
import { WHITE, WHITE_GREY_03, BLUE, RED, YELLOW, GREEN } from './Colors'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const CONTAINER_V2 = {
  backgroundColor: WHITE,
  flex: 1,
  paddingBottom: isIphoneX() ? 35 : 0
}

export const CONTAINER_DARK = {
  backgroundColor: WHITE_GREY_03,
  flex: 1,
  paddingBottom: isIphoneX() ? 35 : 0
}

export const ROW = {
  flexDirection: 'row'
}

export const WRAP = {
  flexWrap: 'wrap'
}

// button primary
export const BUTTON_PRIMARY = {
  ...Fonts.style.button,
  backgroundColor: Fonts.color.primary
}

// button secondary
export const BUTTON_SECONDARY = {
  backgroundColor: BLUE,
  ...Fonts.style.button
}

// text primary
export const TEXT_PRIMARY_XTINY = {
  color: Fonts.color.primary,
  ...Fonts.style.xtiny
}

export const TEXT_PRIMARY_XTINY_BOLD = {
  color: Fonts.color.primary,
  ...Fonts.style.xtinyBold
}

export const TEXT_PRIMARY_TINY = {
  color: Fonts.color.primary,
  ...Fonts.style.tiny
}

export const TEXT_PRIMARY_TINY_BOLD = {
  color: Fonts.color.primary,
  ...Fonts.style.tinyBold
}

export const TEXT_PRIMARY_DEFAULT = {
  color: Fonts.color.primary,
  ...Fonts.style.small
}

export const TEXT_PRIMARY_DEFAULT_BOLD = {
  color: Fonts.color.primary,
  ...Fonts.style.smallBold
}

export const TEXT_PRIMARY_MEDIUM = {
  color: Fonts.color.primary,
  ...Fonts.style.medium
}

export const TEXT_PRIMARY_MEDIUM_BOLD = {
  color: Fonts.color.primary,
  ...Fonts.style.mediumBold
}

export const TEXT_PRIMARY_LARGE = {
  color: Fonts.color.primary,
  ...Fonts.style.large
}

export const TEXT_PRIMARY_LARGE_BOLD = {
  color: Fonts.color.primary,
  ...Fonts.style.largeBold
}

// text secondary
export const TEXT_SECONDARY_XTINY = {
  color: BLUE,
  ...Fonts.style.xtiny
}

export const TEXT_SECONDARY_XTINY_BOLD = {
  color: BLUE,
  ...Fonts.style.xtinyBold
}

export const TEXT_SECONDARY_TINY = {
  color: BLUE,
  ...Fonts.style.tiny
}

export const TEXT_SECONDARY_TINY_BOLD = {
  color: BLUE,
  ...Fonts.style.tinyBold
}

export const TEXT_SECONDARY_DEFAULT = {
  color: BLUE,
  ...Fonts.style.small
}

export const TEXT_SECONDARY_DEFAULT_BOLD = {
  color: BLUE,
  ...Fonts.style.smallBold
}

export const TEXT_SECONDARY_MEDIUM = {
  color: BLUE,
  ...Fonts.style.medium
}

export const TEXT_SECONDARY_MEDIUM_BOLD = {
  color: BLUE,
  ...Fonts.style.mediumBold
}

export const TEXT_SECONDARY_LARGE = {
  color: BLUE,
  ...Fonts.style.large
}

export const TEXT_SECONDARY_LARGE_BOLD = {
  color: BLUE,
  ...Fonts.style.largeBold
}

// text description
export const TEXT_DESCRIPTION_XTINY = {
  color: Fonts.color.description,
  ...Fonts.style.xtiny
}

export const TEXT_DESCRIPTION_XTINY_BOLD = {
  color: Fonts.color.description,
  ...Fonts.style.xtinyBold
}

export const TEXT_DESCRIPTION_TINY = {
  color: Fonts.color.description,
  ...Fonts.style.tiny
}

export const TEXT_DESCRIPTION_TINY_BOLD = {
  color: Fonts.color.description,
  ...Fonts.style.tinyBold
}

export const TEXT_DESCRIPTION_DEFAULT = {
  color: Fonts.color.description,
  ...Fonts.style.small
}

export const TEXT_DESCRIPTION_DEFAULT_BOLD = {
  color: Fonts.color.description,
  ...Fonts.style.smallBold
}

export const TEXT_DESCRIPTION_MEDIUM = {
  color: Fonts.color.description,
  ...Fonts.style.medium
}

export const TEXT_DESCRIPTION_MEDIUM_BOLD = {
  color: Fonts.color.description,
  ...Fonts.style.mediumBold
}

export const TEXT_DESCRIPTION_LARGE = {
  color: Fonts.color.description,
  ...Fonts.style.large
}

export const TEXT_DESCRIPTION_LARGE_BOLD = {
  color: Fonts.color.description,
  ...Fonts.style.largeBold
}

// text white
export const TEXT_WHITE_XTINY = {
  color: Fonts.color.white,
  ...Fonts.style.xtiny
}

export const TEXT_WHITE_XTINY_BOLD = {
  color: Fonts.color.white,
  ...Fonts.style.xtinyBold
}

export const TEXT_WHITE_TINY = {
  color: Fonts.color.white,
  ...Fonts.style.tiny
}

export const TEXT_WHITE_TINY_BOLD = {
  color: Fonts.color.white,
  ...Fonts.style.tinyBold
}

export const TEXT_WHITE_DEFAULT = {
  color: Fonts.color.white,
  ...Fonts.style.small
}

export const TEXT_WHITE_DEFAULT_BOLD = {
  color: Fonts.color.white,
  ...Fonts.style.smallBold
}

export const TEXT_WHITE_MEDIUM = {
  color: Fonts.color.white,
  ...Fonts.style.medium
}

export const TEXT_WHITE_MEDIUM_BOLD = {
  color: Fonts.color.white,
  ...Fonts.style.mediumBold
}

export const TEXT_WHITE_LARGE = {
  color: Fonts.color.white,
  ...Fonts.style.large
}

export const TEXT_WHITE_LARGE_BOLD = {
  color: Fonts.color.white,
  ...Fonts.style.largeBold
}

// MARGIN & PADDING

export const MARGIN_HORIZONTAL_10 = {
  marginHorizontal: BASE_MARGIN
}

export const MARGIN_HORIZONTAL_25 = {
  marginHorizontal: SIZE_SECTION
}

export const MARGIN_VERTICAL_25 = {
  marginVertical: SIZE_SECTION
}

export const MARGIN_VERTICAL_10 = {
  marginVertical: BASE_MARGIN
}

export const PADDING_VERTICAL_25 = {
  paddingVertical: SIZE_SECTION
}

export const PADDING_VERTICAL_10 = {
  paddingVertical: BASE_MARGIN
}

export const PADDING_VERTICAL_5 = {
  paddingVertical: TINY_MARGIN
}

export const PADDING_HORIZONTAL_25 = {
  paddingHorizontal: SIZE_SECTION
}

export const PADDING_HORIZONTAL_50 = {
  paddingHorizontal: DOUBLE_SECTION
}

export const PADDING_HORIZONTAL_10 = {
  paddingHorizontal: BASE_MARGIN
}

export const PADDING_HORIZONTAL_5 = {
  paddingHorizontal: TINY_MARGIN
}

export const PADDING_VERTICAL_TEXT = {
  paddingVertical: TINY_MARGIN / 2
}

export const SECTION = {
  paddingVertical: DOUBLE_BASE_MARGIN,
  paddingHorizontal: DOUBLE_BASE_MARGIN
}

export const NO_PADDING_VERTICAL = {
  paddingVertical: 0
}

export const BADGE = {
  textAlign: 'center',
  borderRadius: 12,
  color: Fonts.color.white,
  fontSize: 10,
  paddingVertical: 7
}

export const BADGE_RED = {
  ...BADGE,
  backgroundColor: RED
}

export const BADGE_YELLOW = {
  ...BADGE,
  backgroundColor: YELLOW
}

export const BADGE_GREEN = {
  ...BADGE,
  backgroundColor: GREEN
}

export const CARD_ERROR = {
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderTopColor: RED,
  borderBottomColor: RED
}

export const SUBMIT_MODAL = {
  marginTop: 40,
  textAlign: 'right'
}
