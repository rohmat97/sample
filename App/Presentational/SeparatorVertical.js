import React, { Component } from 'react'
import { View } from 'react-native'
import { WHITE_GREY_03 } from '../Themes/Colors'

export default class SeparatorVertical extends Component {
  render() {
    return (
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: WHITE_GREY_03
        }}
      />
    )
  }
}
