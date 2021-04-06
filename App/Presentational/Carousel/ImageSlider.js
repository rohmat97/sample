import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import {} from '../../Themes/ApplicationStyles'
import SliderEntry from './SliderEntry'
import styles from './styles/index.style'
import { sliderWidth, itemWidth } from './styles/SliderEntry.style'
import { GRAY_DARK, BLUE } from '../../Themes/Colors'

const SLIDER_1_FIRST_ITEM = 0

export default class ImageSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSlide: SLIDER_1_FIRST_ITEM
    }
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} parallax={false} parallaxProps={parallaxProps} />
  }

  renderSlider = (data) => {
    const { activeSlide } = this.state
    return (
      <View style={styles.exampleContainerLight}>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={data}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          windowSize={1}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.paginationDot}
          inactiveDotColor={GRAY_DARK}
          dotColor={BLUE}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    )
  }

  render() {
    const { data } = this.props
    return this.renderSlider(data)
  }
}
