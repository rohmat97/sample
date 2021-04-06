import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { BASE_MARGIN, DOUBLE_BASE_MARGIN, SMALL_MARGIN } from '../Themes/Metrics'
import { WHITE } from '../Themes/Colors'

export default class Item extends Component {
  render() {
    const {
      children,
      style,
      header,
      flex,
      small,
      start,
      center,
      end,
      width,
      height,
      plain,
      spaceBetween,
      spaceAround,
      verticalCenter,
      row,
      column,
      backgroundColor,
      borderRadius
    } = this.props

    return (
      <View
        style={[
          header ? styles.containerHeader : styles.container,
          style,
          {
            ...(flex ? { flex: 1 } : null),
            ...(small ? { paddingVertical: SMALL_MARGIN } : null),
            ...(width ? { width: width } : null),
            ...(height ? { height: height } : null),
            ...(start ? { alignItems: 'flex-start' } : null),
            ...(end ? { alignItems: 'flex-end' } : null),
            ...(center ? { alignItems: 'center' } : null),
            ...(verticalCenter ? { justifyContent: 'center' } : null),
            ...(plain ? { paddingVertical: 0, paddingHorizontal: 0 } : null),
            ...(spaceBetween ? { justifyContent: 'space-between' } : null),
            ...(spaceAround ? { justifyContent: 'space-around' } : null),
            ...(row ? { flexDirection: 'row' } : null),
            ...(column ? { flexDirection: 'column' } : null),
            ...(backgroundColor ? { backgroundColor } : null),
            ...(borderRadius ? { borderRadius } : null)
          }
        ]}
      >
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: BASE_MARGIN,
    backgroundColor: 'transparent'
  },
  containerHeader: {
    paddingVertical: DOUBLE_BASE_MARGIN,
    backgroundColor: WHITE
  }
})
