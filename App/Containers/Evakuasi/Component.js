/* eslint-disable no-empty-pattern */
import React from 'react'
import { Image, Animated, StyleSheet, TouchableOpacity, Linking, Platform, View } from 'react-native'
import { Item, Text, RippleTouch, Section } from '../../Presentational'
import { WHITE_GREY_03, RED, WHITE } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { Images } from '../../Themes'

export const RenderGambar = ({ dataEvakuasi, menuMarker, navigate }) => (
  <Section row style={{ height: SCREEN_HEIGHT * 0.4 }}>
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={true}
      snapToInterval={SCREEN_HEIGHT / 6}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: this.animation
              }
            }
          }
        ],
        { useNativeDriver: true }
      )}
      style={styles.scrollView}
      contentContainerStyle={styles.endPadding}
    >
      {menuMarker.map((data, i) => {
        if (menuMarker.length < 2) {
          return (
            <Item center backgroundColor={WHITE_GREY_03} style={styles.menu}>
              <Text description>INFO BPBD</Text>
              <Item>
                <Text primary description>
                  {data.description}
                </Text>
              </Item>
            </Item>
          )
        } else {
          return (
            <RippleTouch key={i} onPress={() => navigate('DetailMenuScreen')}>
              <Item center backgroundColor={WHITE_GREY_03} style={styles.menu}>
                <Text description>INFO BPBD</Text>
                <Item>
                  <Text primary description>
                    {data.message}
                  </Text>
                </Item>
              </Item>
            </RippleTouch>
          )
        }
      })}
    </Animated.ScrollView>
  </Section>
)

export const RenderPengungsi = ({ dataEvakuasi }) => (
  <View>
    <Section style={styles.container}>
      <Image source={Images.pengungsi} style={styles.icon} />
      <Item row style={styles.victim}>
        <Text description style={{ fontSize: 12 }}>
          Saat ini ada {dataEvakuasi.totalVictim} Pengungsi yang berada di titik evakuasi ini
        </Text>
      </Item>
    </Section>
  </View>
)

export const RenderEvakusiSite = ({ dataEvakuasi, coordinate, evacuationSite, address, emergency }) => (
  <View>
    {emergency ? (
      <TouchableOpacity
        onPress={() => {
          const uri = 'http://maps.google.com/maps?daddr=' + coordinate.latitude + '+' + coordinate.longitude

          const uriIOS = 'http://maps.google.com/maps?daddr=' + coordinate.latitude + '+' + coordinate.longitude

          Linking.openURL(Platform.OS === 'ios' ? uriIOS : uri)
        }}
      >
        <Section style={styles.container}>
          <Image source={Images.titik_evakuasi} style={styles.icon} />
          <Item style={styles.component}>
            <Text red style={{ Colors: RED, fontSize: 12 }}>
              {evacuationSite}
            </Text>
            <Text tiny>{address}</Text>
          </Item>
        </Section>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => {
          const uri =
            'http://maps.google.com/maps?daddr=' +
            dataEvakuasi.coordinate.latitude +
            '+' +
            dataEvakuasi.coordinate.longitude

          const uriIOS =
            'http://maps.google.com/maps?daddr=' +
            dataEvakuasi.coordinate.latitude +
            '+' +
            dataEvakuasi.coordinate.longitude

          Linking.openURL(Platform.OS === 'ios' ? uriIOS : uri)
        }}
      >
        <Section style={styles.container}>
          <Image source={Images.titik_evakuasi} />
          <Item style={styles.component}>
            <Text red style={{ textColor: RED, fontSize: 12 }}>
              {dataEvakuasi.evacuationSite}
            </Text>
            <Text tiny>{dataEvakuasi.address}</Text>
          </Item>
        </Section>
      </TouchableOpacity>
    )}
  </View>
)

export const RenderButton = ({ moveToCommentEmergency }) => (
  <Section style={{ justifyContent: 'flex-end' }}>
    <Item width={SCREEN_WIDTH} row center>
      <TouchableOpacity onPress={() => moveToCommentEmergency()}>
        <Item
          backgroundColor={'#a01414'}
          width={SCREEN_WIDTH * 0.15}
          height={SCREEN_WIDTH * 0.15}
          borderRadius={4}
          center
        >
          <Image source={Images.chat_emergency} style={{ height: SCREEN_WIDTH * 0.1, width: SCREEN_WIDTH * 0.1 }} />
        </Item>
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingLeft: 12 }} onPress={() => alert(' Masih dalam tahap development ')}>
        <Item
          backgroundColor={'#a01414'}
          width={SCREEN_WIDTH * 0.7}
          height={SCREEN_WIDTH * 0.15}
          borderRadius={4}
          center
        >
          <Text style={{ color: WHITE }}>Pengajuan Donasi</Text>
        </Item>
      </TouchableOpacity>
    </Item>
  </Section>
)
const styles = StyleSheet.create({
  victim: {
    flexDirection: 'row',
    fontFamily: 'NunitoSans-Bold',
    marginLeft: 12,
    width: SCREEN_WIDTH * 0.5
  },
  component: {
    flexDirection: 'column',
    fontFamily: 'NunitoSans-Bold',
    marginLeft: 12
  },
  Loading: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  menu: {
    margin: 20,
    borderRadius: 8,
    height: SCREEN_HEIGHT / 3.5,
    width: SCREEN_WIDTH * 0.8
  },
  scrollView: {
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingLeft: 4,
    paddingRight: 4
  },
  container: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.15,
    paddingLeft: 24,
    paddingRight: 24
  },
  icon: {
    height: 32,
    width: 32,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})
