import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { WHITE } from '../Themes/Colors'
import { SECTION } from '../Themes/ApplicationStyles'

export default class CustomModal extends Component {
  render() {
    const { children, containerStyle } = this.props
    return (
      <Modal
        {...this.props}
        animationIn="bounceIn"
        animationOut="bounceOutRight"
        animationOutTiming={250}
        backdropColor={'rgba(0, 0, 0, 0.35)'}
        overlay
      >
        <View style={[styles.containerModal, containerStyle]}>{children}</View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: WHITE,
    ...SECTION,
    borderRadius: 3
  }
})
