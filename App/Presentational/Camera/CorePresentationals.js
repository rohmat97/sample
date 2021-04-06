import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { BLUE, BLACK, WHITE } from '../../Themes/Colors'
import { SCREEN_WIDTH } from '../../Themes/Metrics'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImagePreview from './Preview'

export const PendingView = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BLACK }} />
)

export const TakePictureBtn = ({ onPress, switchFacing }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.capture}>
      <View style={styles.redDot} />
    </TouchableOpacity>
    <TouchableOpacity onPress={switchFacing} style={styles.switch}>
      <Icon name="swap-horizontal" style={styles.switchIcon} />
    </TouchableOpacity>
  </View>
)

export const WaitCamera = ({ status, children }) => {
  return status !== 'READY' ? <PendingView /> : children
}

export const ContainerCamera = ({ heightImg, widthImg, imageUri, children, orientation }) => {
  if (imageUri) {
    return <ImagePreview heightImg={heightImg} widthImg={widthImg} imageUri={imageUri} orientation={orientation} />
  } else {
    return children
  }
}

export const CameraBorder = ({ borderType }) => {
  if (borderType === 'identifyCard') {
    return <IdentityCardBorder />
  }
  if (borderType === 'selfie') {
    return <SelfieBorder />
  }

  return null
}

export const IdentityCardBorder = () => {
  return (
    <View
      style={{
        height: '30%',
        marginBottom: '50%',
        marginHorizontal: (SCREEN_WIDTH * 10) / 100,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: WHITE
      }}
    />
  )
}

export const SelfieBorder = () => {
  return (
    <View
      style={{
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: WHITE,
        height: 320,
        width: 275,
        borderTopLeftRadius: 300,
        borderTopRightRadius: 300,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
        marginBottom: '20%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
      }}
    />
  )
}

const styles = {
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  capture: {
    backgroundColor: '#ffffff',
    borderRadius: 37.5,
    padding: 20,
    marginBottom: 50,
    borderWidth: 5,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  switch: {
    position: 'absolute',
    marginLeft: 110,
    backgroundColor: BLUE,
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 11.5,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'rgba(246, 146, 32, 0.5)'
  },
  switchIcon: {
    color: WHITE,
    fontSize: 24
  },
  redDot: {
    backgroundColor: BLUE,
    borderRadius: 17.5,
    width: 25,
    height: 25
  }
}
