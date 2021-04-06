/* eslint-disable no-undef */
import React, { Component } from 'react'
import { View, Image } from 'react-native'

import Swiper from 'react-native-swiper'
import { Loader, RenderIf } from '../../Presentational'
import { ORANGE } from '../../Themes/Colors'
import { Images } from '../../Themes'

class Slider extends Component {
  state = {
    data: null
  }

  render() {
    const { data } = this.state
    const { height } = this.props
    return (
      <View style={{ height: height || 270 }}>
        <Swiper
          showsButtons={false}
          loop={true}
          autoplay={true}
          autoplayDirection={true}
          autoplayTimeout={3}
          activeDotColor={ORANGE}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginLeft: 13
          }}
          activeDotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginLeft: 13
          }}
        >
          {this.renderSlider(data, height)}
        </Swiper>
      </View>
    )
  }

  componentDidMount = () => {
    if (this.props.data) this.setState({ data: this.props.data })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.data !== this.props.data) {
      if (this.props.data) this.setState({ data: this.props.data })
    }
  }

  renderSlider(data, height) {
    if (data) {
      if (data.length > 0) {
        return data.map((item, key) => {
          return (
            <View key={Math.random()}>
              <RenderIf condition={item.image}>
                <Image source={item.image} />
              </RenderIf>
              <RenderIf condition={!item.image}>
                <Image source={{ uri: item.imageUrl }} style={{ height: height || 270, resizeMode: 'contain' }} />
              </RenderIf>
            </View>
          )
        })
      } else {
        return (
          <View key={Math.random()}>
            <Image
              source={Images.empty_state_large}
              style={{ height: height || 270, resizeMode: 'contain', alignSelf: 'center' }}
            />
          </View>
        )
      }
    } else {
      return <Loader loading={true} />
    }
  }
}

export default Slider
