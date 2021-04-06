import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Images } from '../Themes'
import { Item, Footer, Text, Section, Icon, Container } from '../Presentational'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { WHITE_GREY_01, WHITE, BLUE } from '../Themes/Colors'

export default class LaunchScreen extends Component {
  render() {
    return (
      <Container style={{ paddingTop: isIphoneX() ? 35 : 0, backgroundColor: WHITE_GREY_01 }}>
        <Image source={Images.background_homescreen} style={styles.backgroundImage} resizeMode="stretch" />
        <Section>
          <Item>
            <Item>
              <Image source={Images.indohub} style={styles.logo} />
            </Item>
          </Item>
          <Item>
            <Item center>
              <Image source={Images.ic_map} style={styles.icon} />
            </Item>
          </Item>
          <Item center style={{ marginTop: -36 }}>
            <Text secondary large bold>
              Map CCTV
            </Text>
          </Item>
          <Item center style={{ marginBottom: -30 }}>
            <Item plain style={{ borderBottomColor: WHITE, borderBottomWidth: 2, width: '60%' }}>
              <Text secondary large bold>
                Silakan pilih lokasi anda
              </Text>
            </Item>
          </Item>
          <Item />
          <Item>
            <Item>
              <Image source={Images.jabarhub} style={styles.logo} />
            </Item>
          </Item>
          <Item>
            <Item plain>
              <Image source={Images.bandunghub} style={styles.logo} />
            </Item>
          </Item>
        </Section>
        <Footer borderWidth={0} backgroundColor={'transparent'}>
          <Item center>
            <Item center style={{ backgroundColor: BLUE, width: '35%', borderRadius: 4 }}>
              <Item row plain>
                <Icon name="login" color={WHITE} size={18} />
                <Text bold style={{ paddingLeft: 8, color: WHITE }}>
                  LOGIN
                </Text>
              </Item>
            </Item>
          </Item>
        </Footer>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  icon: {
    height: 60,
    width: 60
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
