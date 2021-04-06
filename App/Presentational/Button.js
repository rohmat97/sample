import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Keyboard
} from 'react-native'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '../Themes/ApplicationStyles'
import { NativeFeedbackProps } from '.'
import { WHITE, LIGHT_GREY, BLUE, BLACK, WHITE_GREY_01, BLACK_FADING, MAROON } from '../Themes/Colors'
import Fonts from '../Themes/Fonts'
import { BASE_MARGIN, SCREEN_HEIGHT, SCREEN_WIDTH } from '../Themes/Metrics'
import TimerMixin from 'react-timer-mixin'

let ButtonByPlatform = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

class Button extends PureComponent {
  state = {
    componentFetch: this.props.isFetching,
    componentSync: false
  }

  buttonStyle = () => {
    const { reverse, secondary, red, emergency, emergencyCancle } = this.props

    if (emergency) {
      return styles.ButtonBottomEmergency
    } else {
      if (emergencyCancle) {
        return styles.ButtonBottomCancelEmergency
      } else {
        if (red) {
          return styles.ButtonBottom
        } else {
          if (secondary) {
            if (reverse) {
              return styles.buttonSecondaryReverse
            } else {
              return styles.buttonSecondary
            }
          } else {
            if (reverse) {
              return styles.buttonReverse
            } else {
              return styles.button
            }
          }
        }
      }
    }
  }

  buttonTextStyle = () => {
    const { reverse, emergencyCancle, emergency } = this.props
    if (emergency) {
      return styles.buttonTextEmergency
    } else {
      if (emergencyCancle) {
        return styles.buttonTextEmergency
      } else {
        if (reverse) {
          return styles.buttonTextReverse
        } else {
          return styles.buttonText
        }
      }
    }
  }

  showRipple = () => {
    const { componentFetch } = this.state
    const { fetch } = this.props

    if (componentFetch) return null
    Keyboard.dismiss()

    if (fetch) {
      const { onPress } = this.props
      onPress()
    } else {
      this.actionButton()
    }
  }

  actionButton = () => {
    const { componentFetch } = this.state

    if (!componentFetch) {
      this.setState(
        {
          componentFetch: true
        },
        () => {
          TimerMixin.setTimeout(() => {
            const { onPress } = this.props
            onPress()
          }, 0)

          TimerMixin.setTimeout(() => {
            this.setState({
              componentFetch: false
            })
          }, 1000)
        }
      )
    }
  }

  wrapTranslator = (translated) => {
    return translated || ''
  }

  wrapFunc = (text) => {
    const { uppercase } = this.props
    if (uppercase) return text.toUpperCase()
    else return text
  }

  renderButton = () => {
    const { children, textStyle, reverse, fetch } = this.props
    const { componentFetch } = this.state

    if (fetch) {
      if (!componentFetch) {
        return (
          <Text style={[this.buttonTextStyle(), textStyle]}>
            {typeof children === 'string' ? this.wrapFunc(children) : children}
          </Text>
        )
      } else {
        return <ActivityIndicator color={reverse ? BLACK : WHITE} size={'small'} />
      }
    } else {
      return (
        <Text style={[this.buttonTextStyle(), textStyle]}>
          {typeof children === 'string' ? this.wrapFunc(children) : children}
        </Text>
      )
    }
  }

  render() {
    const { containerStyle } = this.props
    const { componentFetch } = this.state
    return (
      <ButtonByPlatform onPress={this.showRipple} {...NativeFeedbackProps} disabled={!!componentFetch}>
        <View style={[this.buttonStyle(), containerStyle]}>{this.renderButton()}</View>
      </ButtonByPlatform>
    )
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isFetching !== this.props.isFetching) {
      if (this.props.isFetching === false) {
        TimerMixin.setTimeout(() => {
          this.setState({
            componentFetch: false
          })
        }, 1000)
      }
      if (this.props.isFetching === true) {
        this.setState({
          componentFetch: true
        })
      }
    }
  }
}

const styles = {
  ButtonBottomEmergency: {
    backgroundColor: MAROON,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100,
    width: SCREEN_WIDTH * 0.45
  },
  ButtonBottomCancelEmergency: {
    backgroundColor: WHITE_GREY_01,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100,
    width: SCREEN_WIDTH * 0.45
  },
  ButtonBottom: {
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#a01414',
    borderWidth: 1,
    borderColor: '#a01414',
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  },
  button: {
    ...BUTTON_PRIMARY,
    marginVertical: BASE_MARGIN,
    borderRadius: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  },
  buttonSecondary: {
    ...BUTTON_SECONDARY,
    marginVertical: BASE_MARGIN,
    borderRadius: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  },
  buttonReverse: {
    marginVertical: BASE_MARGIN,
    borderRadius: 5,
    backgroundColor: WHITE,
    borderWidth: 2,
    borderColor: BLACK,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  },
  buttonSecondaryReverse: {
    marginVertical: BASE_MARGIN,
    borderRadius: 5,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BLUE,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  },
  buttonText: {
    ...Fonts.style.button,
    margin: 12,
    textAlign: 'center',
    color: WHITE
  },
  buttonTextEmergency: {
    ...Fonts.style.button,
    textAlign: 'center',
    color: WHITE
  },
  buttonTextEmergencyCancle: {
    ...Fonts.style.button,
    textAlign: 'center',
    color: BLACK_FADING
  },
  buttonTextReverse: {
    ...Fonts.style.button,
    margin: 12,
    textAlign: 'center',
    color: BLACK
  },
  buttonDisabled: {
    marginVertical: BASE_MARGIN,
    borderRadius: 5,
    backgroundColor: LIGHT_GREY,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (6 * SCREEN_HEIGHT) / 100
  }
}

Button.propTypes = {
  default: PropTypes.any,
  secondary: PropTypes.any,
  reverse: PropTypes.any,
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  isFetching: PropTypes.bool,
  translate: PropTypes.bool,
  disabled: PropTypes.bool,
  uppercase: PropTypes.bool,
  analyticEventName: PropTypes.string,
  analyticEventData: PropTypes.object
}

Button.defaultProps = {
  default: true,
  secondary: false,
  reverse: false,
  onPress: null,
  containerStyle: null,
  isFetching: false,
  translate: false,
  disabled: false,
  uppercase: false,
  analyticEventName: '',
  analyticEventData: {}
}

export default Button
