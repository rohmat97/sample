import React from 'react'
import { Image, StyleSheet, FlatList, TouchableOpacity, Linking, Platform } from 'react-native'
import { Images } from '../../Themes'
import { WHITE_GREY_02, WHITE, GREY } from '../../Themes/Colors'
import { Item, Text, Container, RippleTouch, Section, RenderIf } from '../../Presentational'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Themes/Metrics'

export const EmptyMyReport = () => {
  return (
    <Container style={{ paddingTop: isIphoneX() ? 35 : 0, backgroundColor: WHITE_GREY_02 }}>
      <Section style={{ marginTop: SCREEN_WIDTH / 6 }}>
        <Item center>
          <Image source={Images.emptyExplorer} style={styles.logo} />
        </Item>
      </Section>
      <Section>
        <Item center>
          <Text bold>Tidak Ada Laporan</Text>
        </Item>
      </Section>
    </Container>
  )
}

export const ImagesIcon = ({ item }) => {
  return (
    <Item row style={styles.containerCategory}>
      <RenderIf condition={item.headline === 'Banjir' || item.categoryVictimReport === 'Banjir'}>
        <Image source={Images.ic_banjir} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Tanah Retak' || item.categoryVictimReport === 'Tanah Retak'}>
        <Image source={Images.ic_tanah_retak} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf
        condition={item.headline === 'Angin Puting Beliung' || item.categoryVictimReport === 'Angin Puting Beliung'}
      >
        <Image source={Images.ic_puting_beliung} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Longsor' || item.categoryVictimReport === 'Longsor'}>
        <Image source={Images.ic_longsor} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Tsunami' || item.categoryVictimReport === 'Tsunami'}>
        <Image source={Images.ic_banjir} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Gempa' || item.categoryVictimReport === 'Gempa'}>
        <Image source={Images.ic_gempa} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Gunung Meletus' || item.categoryVictimReport === 'Gunung Meletus'}>
        <Image source={Images.ic_gunung_meletus} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Tawuran' || item.categoryVictimReport === 'Tawuran'}>
        <Image source={Images.ic_tawuran} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Macet' || item.categoryVictimReport === 'Macet'}>
        <Image source={Images.ic_macet} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Tabrakan' || item.categoryVictimReport === 'Tabrakan'}>
        <Image source={Images.ic_tabrakan} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Sampah Menumpuk' || item.categoryVictimReport === 'Sampah Menumpuk'}>
        <Image source={Images.ic_sampah} style={styles.iconCategory} />
      </RenderIf>
      <RenderIf condition={item.headline === 'Acara Warga' || item.categoryVictimReport === 'Acara Warga'}>
        <Image source={Images.ic_acara} style={styles.iconCategory} />
      </RenderIf>
      <Text numberOfLines={1} style={styles.textCategory}>
        {item.headline ? item.headline : item.categoryVictimReport}
      </Text>
    </Item>
  )
}

export const ListMyReport = ({ data, moveToScrenDetailEvent }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <Item backgroundColor={WHITE}>
        <Item row style={styles.containerReport}>
          <Item width={'75%'}>
            <TouchableOpacity
              onPress={() => {
                moveToScrenDetailEvent(item)
              }}
            >
              <ImagesIcon item={item} />
              <Item>
                <Text style={{ marginLeft: 20 }}>{item.address}</Text>
              </Item>
            </TouchableOpacity>
          </Item>
          <RippleTouch
            style={styles.containerAddress}
            onPress={() => {
              const uri =
                'http://maps.google.com/maps?daddr=' + item.coordinate.latitude + '+' + item.coordinate.longitude

              const uriIOS =
                'http://maps.google.com/maps?daddr=' + item.coordinate.latitude + '+' + item.coordinate.longitude

              Linking.openURL(Platform.OS === 'ios' ? uriIOS : uri)
            }}
          >
            <Item>
              <Image source={Images.ic_directions} style={styles.logoDir} />
              <Text center style={{ color: WHITE }}>
                Petunjuk Arah
              </Text>
            </Item>
          </RippleTouch>
        </Item>
      </Item>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
)

export const ListMyEmergencyReport = ({ data, moveToScrenDetailEmergency }) => (
  <FlatList
    data={data}
    renderItem={({ item }) => (
      <Item backgroundColor={WHITE}>
        <Item row style={styles.containerReport}>
          <Item width={'75%'}>
            <TouchableOpacity
              onPress={() => {
                moveToScrenDetailEmergency(item)
              }}
            >
              <ImagesIcon item={item} />
              <Item>
                <Text style={{ marginLeft: 20 }}>{item.address}</Text>
              </Item>
            </TouchableOpacity>
          </Item>
          <RippleTouch
            style={styles.containerAddress}
            onPress={() => {
              const uri =
                'http://maps.google.com/maps?daddr=' + item.coordinate.latitude + '+' + item.coordinate.longitude

              const uriIOS =
                'http://maps.google.com/maps?daddr=' + item.coordinate.latitude + '+' + item.coordinate.longitude

              Linking.openURL(Platform.OS === 'ios' ? uriIOS : uri)
            }}
          >
            <Item>
              <Image source={Images.ic_directions} style={styles.logoDir} />
              <Text center style={{ color: WHITE }}>
                Petunjuk Arah
              </Text>
            </Item>
          </RippleTouch>
        </Item>
      </Item>
    )}
    keyExtractor={(item, index) => index.toString()}
  />
)

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  logoDir: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  iconCategory: {
    width: 20,
    height: 20,
    marginLeft: 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 40,
    marginVertical: 5,
    fontSize: 20
  },
  containerReport: {
    backgroundColor: WHITE,
    height: SCREEN_HEIGHT / 5.5,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  containerAddress: {
    backgroundColor: '#4496ff',
    width: '25%',
    marginVertical: -10,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15
  },
  containerCategory: {
    width: SCREEN_WIDTH / 2.75,
    paddingVertical: 3,
    marginLeft: 15,
    marginTop: -10,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: GREY
  },
  textCategory: {
    marginLeft: 10,
    width: SCREEN_WIDTH / 4
  },
  chipContainer: {
    width: SCREEN_WIDTH * 0.45,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: -10,
    marginHorizontal: SCREEN_WIDTH * 0.025
  }
})
