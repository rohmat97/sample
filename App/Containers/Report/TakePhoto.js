import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Camera, RenderIf } from '../../Presentational'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import TimerMixin from 'react-timer-mixin'
import { WHITE, BLACK } from '../../Themes/Colors'

function TakePhoto(props) {
  const { navigation } = props
  const { navigate, getParam, addListener } = navigation
  const [facing] = useState(getParam('facing'))
  const [borderType] = useState(getParam('borderType'))
  const [showCamera, setShowCamera] = useState(false)

  useEffect(() => {
    addListener('willFocus', refreshCamera)
    TimerMixin.setTimeout(() => {
      setShowCamera(true)
    }, 300)
  }, [])

  const refreshCamera = () => {
    TimerMixin.setTimeout(() => {
      this.camera.resumePreview()
    }, 300)
  }

  const onCaptured = ({ imageUri, orientation }) => {
    navigate('TakePhotoPreviewScreen', { imageUri, orientation, source: getParam('source') })
  }

  return (
    <View style={styles.container}>
      <RenderIf condition={showCamera}>
        <Camera
          facing={facing}
          borderType={borderType}
          cameraData={onCaptured}
          cameraRef={(ref) => (this.camera = ref)}
        />
      </RenderIf>
    </View>
  )
}

TakePhoto.navigationOptions = () => ({
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0
  },
  headerTintColor: WHITE
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH
  }
})

export default TakePhoto
