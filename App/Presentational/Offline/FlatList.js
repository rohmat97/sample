import React, { Component } from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { Section, Item, Text } from '../'
import PropTypes from 'prop-types'
import { BASE_MARGIN, SECTION } from '../../Themes/Metrics'
import { BLACK } from '../../Themes/Colors'
import { PADDING_HORIZONTAL_25 } from '../../Themes/ApplicationStyles'

let ButtonByPlatform = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

class FlatListOffline extends Component {
  render() {
    const { reload, height } = this.props
    return (
      <View style={{ justifyContent: 'center', height: height }}>
        <Section>
          <Item small center>
            <Text large bold>
              Sepertinya anda sedang offline
            </Text>
          </Item>
          <Item center small style={PADDING_HORIZONTAL_25}>
            <Text description style={styles.text}>
              Coba periksa Koneksi Wi-Fi atau data selular dan coba kembali.
            </Text>
          </Item>
        </Section>
        <Section>
          <Item>
            <ButtonByPlatform onPress={reload}>
              <View style={styles.button}>
                <Text tiny white bold>
                  COBA LAGI
                </Text>
              </View>
            </ButtonByPlatform>
          </Item>
        </Section>
      </View>
    )
  }
}

const styles = {
  button: {
    backgroundColor: BLACK,
    paddingVertical: BASE_MARGIN,
    paddingHorizontal: SECTION,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40
  },
  text: {
    textAlign: 'center'
  }
}

FlatListOffline.propTypes = {
  reload: PropTypes.func.isRequired
}

export default FlatListOffline
