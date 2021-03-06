/* eslint-disable no-undef */
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { ParallaxImage } from 'react-native-snap-carousel'
import styles from './styles/SliderEntry.style'

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  }

  get image() {
    const {
      data: { image },
      parallax,
      parallaxProps
    } = this.props

    return parallax ? (
      <ParallaxImage
        source={image}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={'rgba(255, 255, 255, 0.4)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={image} style={styles.image} />
    )
  }

  render() {
    const {
      data: { title, subtitle }
    } = this.props

    const uppercaseTitle = title ? (
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    ) : (
      false
    )

    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={styles.shadow} />
        <View style={styles.imageContainer}>
          {this.image}
          <View style={styles.radiusMask} />
        </View>
        <View style={styles.textContainer}>{uppercaseTitle}</View>
        <Text style={[styles.subtitle]} numberOfLines={2}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    )
  }
}
