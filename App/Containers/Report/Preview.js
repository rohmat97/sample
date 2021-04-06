import React, { useState } from 'react'
import PreviewImage from '../../Presentational/Camera/Preview'
import { WHITE } from '../../Themes/Colors'

function Preview(props) {
  const { navigation } = props
  const { pop, goBack, getParam, state } = navigation
  const [imageUri] = useState(getParam('imageUri'))
  const [orientation] = useState(getParam('orientation'))
  const [fromScreen] = useState(null)

  const getImageSource = (imageSource) => {
    state.params.source(imageSource)
    pop(2)
  }

  return (
    <PreviewImage
      imageUri={imageUri}
      orientation={orientation}
      fromScreen={fromScreen}
      reTake={() => goBack()}
      source={getImageSource}
    />
  )
}

Preview.navigationOptions = () => ({
  headerTransparent: true,
  headerStyle: {
    borderBottomWidth: 0
  },
  headerTintColor: WHITE
})

export default Preview
