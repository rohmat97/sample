import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import { WHITE, WHITE_GREY_03 } from '../Themes/Colors'
import { SCREEN_WIDTH } from '../Themes/Metrics'
import { isIphoneX } from 'react-native-iphone-x-helper'

class Footer extends Component {
  render() {
    const { children, style, backgroundColor, borderWidth, borderTopColor, plain } = this.props
    return (
      <View
        style={[
          plain ? styles.containerPlain : styles.container,
          {
            ...(backgroundColor && { backgroundColor }),
            ...(borderWidth && { borderWidth }),
            ...(borderTopColor && { borderTopColor })
          },
          style
        ]}
      >
        {children}
      </View>
    )
  }
}

const styles = {
  container: {
    position: 'absolute',
    bottom: isIphoneX() ? 35 : 0,
    width: SCREEN_WIDTH,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  containerPlain: {
    position: 'absolute',
    bottom: isIphoneX() ? 35 : 0,
    width: SCREEN_WIDTH,
    paddingVertical: 5
  }
}

Footer.defaultProps = {
  backgroundColor: WHITE,
  borderTopColor: WHITE_GREY_03,
  borderWidth: 1
}

Footer.propTypes = {
  backgroundColor: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderWidth: PropTypes.number
}

export default Footer
