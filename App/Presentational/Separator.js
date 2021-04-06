import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { WHITE_GREY_03, WHITE_GREY_01 } from '../Themes/Colors'
import { RenderIf } from '.'

export default class Separator extends Component {
  render() {
    const { light } = this.props
    return (
      <View>
        <RenderIf condition={!light}>
          <View style={styles.container} />
        </RenderIf>
        <RenderIf condition={light}>
          <View style={styles.containerLight} />
        </RenderIf>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: WHITE_GREY_03
  },
  containerLight: {
    height: 1,
    backgroundColor: WHITE_GREY_01,
    position: 'relative',
    width: '100%',
    zIndex: 999
  }
})
