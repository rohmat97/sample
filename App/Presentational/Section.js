import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { BASE_MARGIN, DOUBLE_BASE_MARGIN } from '../Themes/Metrics'

export default class Section extends Component {
  render() {
    const { children, style, disabled } = this.props

    return (
      <View style={[styles.container, style]} pointerEvents={disabled ? 'none' : 'auto'}>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: BASE_MARGIN,
    paddingHorizontal: DOUBLE_BASE_MARGIN
  }
})
