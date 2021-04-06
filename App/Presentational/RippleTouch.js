/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Platform, View, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { NativeFeedbackProps } from './'
// import TimerMixin from 'react-timer-mixin'

const ButtonByPlatform = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
export default class RippleTouch extends Component {
  showRipple = () => {
    const { onPress } = this.props
    // Keyboard.dismiss()
    // TimerMixin.setTimeout(() => {

    // }, 50)
    onPress()
  }

  render() {
    const { children, style, transparent, onPress, disabled } = this.props
    return (
      <ButtonByPlatform
        disabled={disabled}
        {...(transparent ? null : { ...NativeFeedbackProps })}
        onPress={onPress ? this.showRipple : null}
        underlayColor={transparent ? 'transparent' : null}
      >
        <View style={style}>{children}</View>
      </ButtonByPlatform>
    )
  }
}
