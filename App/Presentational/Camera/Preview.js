import React from 'react'
import { View, Image } from 'react-native'
import { BLACK, WHITE } from '../../Themes/Colors'
import { SCREEN_HEIGHT } from '../../Themes/Metrics'
import { Button, Item } from '../'

function Preview(props) {
  const { reTake, imageUri } = props

  const saveImage = (imageUri) => {
    props.source(imageUri)
  }

  return (
    <View style={{ flex: 1, backgroundColor: BLACK, height: SCREEN_HEIGHT, justifyContent: 'center' }}>
      <View
        style={{
          height: '70%'
        }}
      >
        <Image
          source={{ uri: imageUri, isStatic: true }}
          style={{
            width: '100%',
            height: '100%',
            // resizeMode: orientation === 1 || orientation === 2 ? 'cover' : 'contain',
            resizeMode: 'cover',
            justifyContent: 'center'
          }}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '15%',
          bottom: 0,
          borderWidth: 2
        }}
      >
        <Item style={{ flexDirection: 'row', height: '100%' }}>
          <Item style={{ width: '50%', justifyContent: 'center', paddingHorizontal: 30 }}>
            <Button reverse secondary containerStyle={{ borderColor: WHITE }} onPress={() => reTake()}>
              RETRY
            </Button>
          </Item>
          <Item style={{ width: '50%', justifyContent: 'center', paddingHorizontal: 30 }}>
            <Button secondary onPress={() => saveImage(imageUri)}>
              SAVE
            </Button>
          </Item>
        </Item>
      </View>
    </View>
  )
}

export default Preview
