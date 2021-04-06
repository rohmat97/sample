import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  TEXT_PRIMARY_XTINY,
  TEXT_PRIMARY_XTINY_BOLD,
  TEXT_PRIMARY_TINY,
  TEXT_PRIMARY_TINY_BOLD,
  TEXT_PRIMARY_DEFAULT,
  TEXT_PRIMARY_DEFAULT_BOLD,
  TEXT_PRIMARY_MEDIUM,
  TEXT_PRIMARY_MEDIUM_BOLD,
  TEXT_PRIMARY_LARGE,
  TEXT_PRIMARY_LARGE_BOLD,
  TEXT_SECONDARY_XTINY,
  TEXT_SECONDARY_XTINY_BOLD,
  TEXT_SECONDARY_TINY,
  TEXT_SECONDARY_TINY_BOLD,
  TEXT_SECONDARY_DEFAULT,
  TEXT_SECONDARY_DEFAULT_BOLD,
  TEXT_SECONDARY_MEDIUM,
  TEXT_SECONDARY_MEDIUM_BOLD,
  TEXT_SECONDARY_LARGE,
  TEXT_SECONDARY_LARGE_BOLD,
  TEXT_DESCRIPTION_XTINY,
  TEXT_DESCRIPTION_XTINY_BOLD,
  TEXT_DESCRIPTION_TINY,
  TEXT_DESCRIPTION_TINY_BOLD,
  TEXT_DESCRIPTION_DEFAULT,
  TEXT_DESCRIPTION_DEFAULT_BOLD,
  TEXT_DESCRIPTION_MEDIUM,
  TEXT_DESCRIPTION_MEDIUM_BOLD,
  TEXT_DESCRIPTION_LARGE,
  TEXT_DESCRIPTION_LARGE_BOLD,
  TEXT_WHITE_XTINY,
  TEXT_WHITE_XTINY_BOLD,
  TEXT_WHITE_TINY,
  TEXT_WHITE_TINY_BOLD,
  TEXT_WHITE_DEFAULT,
  TEXT_WHITE_DEFAULT_BOLD,
  TEXT_WHITE_MEDIUM,
  TEXT_WHITE_MEDIUM_BOLD,
  TEXT_WHITE_LARGE,
  TEXT_WHITE_LARGE_BOLD
} from '../Themes/ApplicationStyles'

class CustomText extends Component {
  textStyles = () => {
    const { primary, secondary, description, tiny, small, medium, large, bold, white, xtiny } = this.props

    if (!primary && !secondary && !description && !white && !tiny && !small && !medium && !large && !bold)
      return TEXT_PRIMARY_DEFAULT

    if ((primary || !primary) && !secondary && !description && !white) {
      if (xtiny) {
        if (bold) {
          return TEXT_PRIMARY_XTINY_BOLD
        }
        return TEXT_PRIMARY_XTINY
      }
      if (tiny) {
        if (bold) {
          return TEXT_PRIMARY_TINY_BOLD
        }
        return TEXT_PRIMARY_TINY
      }
      if (small) {
        if (bold) {
          return TEXT_PRIMARY_DEFAULT_BOLD
        }
        return TEXT_PRIMARY_DEFAULT
      }
      if (medium) {
        if (bold) {
          return TEXT_PRIMARY_MEDIUM_BOLD
        }
        return TEXT_PRIMARY_MEDIUM
      }
      if (large) {
        if (bold) {
          return TEXT_PRIMARY_LARGE_BOLD
        }
        return TEXT_PRIMARY_LARGE
      }
      if (bold) {
        return TEXT_PRIMARY_DEFAULT_BOLD
      }

      return TEXT_PRIMARY_DEFAULT
    }
    if (secondary) {
      if (xtiny) {
        if (bold) {
          return TEXT_SECONDARY_XTINY_BOLD
        }
        return TEXT_SECONDARY_XTINY
      }
      if (tiny) {
        if (bold) {
          return TEXT_SECONDARY_TINY_BOLD
        }
        return TEXT_SECONDARY_TINY
      }
      if (small) {
        if (bold) {
          return TEXT_SECONDARY_DEFAULT_BOLD
        }
        return TEXT_SECONDARY_DEFAULT
      }
      if (medium) {
        if (bold) {
          return TEXT_SECONDARY_MEDIUM_BOLD
        }
        return TEXT_SECONDARY_MEDIUM
      }
      if (large) {
        if (bold) {
          return TEXT_SECONDARY_LARGE_BOLD
        }
        return TEXT_SECONDARY_LARGE
      }
      if (bold) {
        return TEXT_SECONDARY_DEFAULT_BOLD
      }

      return TEXT_SECONDARY_DEFAULT
    }
    if (description) {
      if (xtiny) {
        if (bold) {
          return TEXT_DESCRIPTION_XTINY_BOLD
        }
        return TEXT_DESCRIPTION_XTINY
      }
      if (tiny) {
        if (bold) {
          return TEXT_DESCRIPTION_TINY_BOLD
        }
        return TEXT_DESCRIPTION_TINY
      }
      if (small) {
        if (bold) {
          return TEXT_DESCRIPTION_DEFAULT_BOLD
        }
        return TEXT_DESCRIPTION_DEFAULT
      }
      if (medium) {
        if (bold) {
          return TEXT_DESCRIPTION_MEDIUM_BOLD
        }
        return TEXT_DESCRIPTION_MEDIUM
      }
      if (large) {
        if (bold) {
          return TEXT_DESCRIPTION_LARGE_BOLD
        }
        return TEXT_DESCRIPTION_LARGE
      }
      if (bold) {
        return TEXT_DESCRIPTION_DEFAULT_BOLD
      }

      return TEXT_DESCRIPTION_DEFAULT
    }
    if (white) {
      if (xtiny) {
        if (bold) {
          return TEXT_WHITE_XTINY_BOLD
        }
        return TEXT_WHITE_XTINY
      }
      if (tiny) {
        if (bold) {
          return TEXT_WHITE_TINY_BOLD
        }
        return TEXT_WHITE_TINY
      }
      if (small) {
        if (bold) {
          return TEXT_WHITE_DEFAULT_BOLD
        }
        return TEXT_WHITE_DEFAULT
      }
      if (medium) {
        if (bold) {
          return TEXT_WHITE_MEDIUM_BOLD
        }
        return TEXT_WHITE_MEDIUM
      }
      if (large) {
        if (bold) {
          return TEXT_WHITE_LARGE_BOLD
        }
        return TEXT_WHITE_LARGE
      }
      if (bold) {
        return TEXT_WHITE_DEFAULT_BOLD
      }

      return TEXT_WHITE_DEFAULT
    }
  }

  render() {
    const { children, style, wrap, center, numberOfLines } = this.props
    return (
      <Text
        {...this.props}
        style={[
          this.textStyles(),
          style,
          {
            ...(wrap ? { flex: 1, flexWrap: 'wrap' } : null),
            ...(center ? { textAlign: 'center' } : null)
          }
        ]}
        numberOfLines={numberOfLines}
      >
        {this.wrapFunc(children)}
      </Text>
    )
  }

  wrapFunc = (text) => {
    const { uppercase } = this.props
    // if (translate) return translator[text]
    return uppercase ? text.toUpperCase() : text
  }
}

CustomText.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  description: PropTypes.bool,
  tiny: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  bold: PropTypes.bool,
  translate: PropTypes.bool,
  uppercase: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(CustomText)
