import { WHITE, DARK_GREY, BLACK } from './Colors'

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const fontFamily = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  xtiny: 10,
  tiny: 12,
  small: 14,
  medium: 16,
  large: 18,
  button: 16,
  nav: 20
}

const color = {
  primary: BLACK,
  description: DARK_GREY,
  white: WHITE
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  large: {
    fontFamily: fontFamily.base,
    fontSize: size.large
  },
  small: {
    fontFamily: fontFamily.base,
    fontSize: size.small
  },
  medium: {
    fontFamily: fontFamily.base,
    fontSize: size.medium
  },
  tiny: {
    fontFamily: fontFamily.base,
    fontSize: size.tiny
  },
  xtiny: {
    fontFamily: fontFamily.base,
    fontSize: size.xtiny
  },
  largeBold: {
    fontFamily: fontFamily.bold,
    fontSize: size.large
  },
  smallBold: {
    fontFamily: fontFamily.bold,
    fontSize: size.small
  },
  mediumBold: {
    fontFamily: fontFamily.bold,
    fontSize: size.medium
  },
  tinyBold: {
    fontFamily: fontFamily.bold,
    fontSize: size.tiny
  },
  xtinyBold: {
    fontFamily: fontFamily.bold,
    fontSize: size.xtiny
  },
  button: {
    fontFamily: fontFamily.bold,
    fontSize: size.button
  }
}

export default {
  type,
  size,
  style,
  color
}
