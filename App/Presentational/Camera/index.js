import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { RNCamera } from 'react-native-camera'
import PropTypes from 'prop-types'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { TakePictureBtn, WaitCamera, ContainerCamera, CameraBorder } from './CorePresentationals'

function Core(props) {
  const { cameraData, facing, borderType } = props
  const [imageUri] = useState(null)
  const [orientation] = useState(null)
  const [heightImg] = useState(null)
  const [widthImg] = useState(null)
  const [facingCamera, setFacingCamera] = useState(facing)

  const takePicture = async (camera) => {
    const options = {
      quality: 0.3,
      exif: false,
      pauseAfterCapture: true,
      base64: false,
      fixOrientation: true,
      forceUpOrientation: true,
      orientation: 'landscape'
    }

    const { uri, deviceOrientation, height, width } = await camera.takePictureAsync(options)

    cameraData({
      heightImg: height,
      widthImg: width,
      imageUri: uri,
      orientation: deviceOrientation
    })
  }

  const switchFacing = () => {
    if (facingCamera === 'front') {
      setFacingCamera('back')
    } else if (facingCamera === 'back') {
      setFacingCamera('front')
    }
  }

  return (
    <ContainerCamera heightImg={heightImg} widthImg={widthImg} imageUri={imageUri} orientation={orientation}>
      <View style={styles.container}>
        <RNCamera ref={(ref) => props.cameraRef(ref)} style={styles.preview} type={facingCamera}>
          {({ camera, status }) => {
            return (
              <WaitCamera status={status}>
                <View style={{ justifyContent: 'center', height: SCREEN_HEIGHT }}>
                  <CameraBorder borderType={borderType} />
                  <TakePictureBtn onPress={() => takePicture(camera)} switchFacing={switchFacing} />
                </View>
              </WaitCamera>
            )
          }}
        </RNCamera>
      </View>
    </ContainerCamera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  preview: {
    flex: 1
  }
})

Core.propTypes = {
  facing: PropTypes.oneOf('back | front'),
  borderType: PropTypes.oneOf('none | identifyCard | selfie')
}

Core.defaultProps = {
  facing: 'identifyCard',
  borderType: 'none'
}

export default Core
