import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TimerMixin from 'react-timer-mixin'
import GowesHubActions from '../../Redux/GowesHubRedux'
import { Images } from '../../Themes'
import { Text, Modal, Item, Button } from '../../Presentational'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { WHITE, MAROON } from '../../Themes/Colors'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { defaultRegion } from '../../Config/ApiConfig'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import { SCREEN_WIDTH, DOUBLE_BASE_MARGIN, SECTION } from '../../Themes/Metrics'
import { SetMarker, IconChat } from './Component'

function GowesHub(props) {
  const { navigation, token, tokenAPIPayload, gowesHubRequest, getAllBiker, profileRequest } = props
  const { navigate } = navigation
  const [jumlahBiker, setJumlahBiker] = useState(0)
  const [anakLaki, setAnakLaki] = useState(0)
  const [anakPerempuan, setAnakPerempuan] = useState(0)
  const [remajaLaki, setRemajaLaki] = useState(0)
  const [remajaPerempuan, setRemajaPerempuan] = useState(0)
  const [dewasaLaki, setDewasaLaki] = useState(0)
  const [dewasaPerempuan, setDewasaPerempuan] = useState(0)
  const [region, setRegion] = useState(defaultRegion)
  const [bikerMarker, setBikerMarker] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [kategori] = useState([
    { headline: 'Anak Laki-laki', image: Images.ic_anak_laki },
    { headline: 'Anak Perempuan', image: Images.ic_anak_perempuan },
    { headline: 'Remaja Laki-laki', image: Images.ic_remaja_laki },
    { headline: 'Remaja Perempuan', image: Images.ic_remaja_perempuan },
    { headline: 'Dewasa Laki-laki', image: Images.ic_dewasa_laki },
    { headline: 'Dewasa Perempuan', image: Images.ic_dewasa_perempuan }
  ])
  let tempBikerAnakLaki = 0
  let tempBikerAnakPerempuan = 0
  let tempBikerRemajaLaki = 0
  let tempBikerRemajaPerempuan = 0
  let tempBikerDewasaLaki = 0
  let tempBikerDewasaPerempuan = 0
  let [iconMarker] = useState()
  let [i, seti] = useState(0)
  const [start, setstart] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.75,
        longitudeDelta: 0.00421 * 1.75
      })
    })
    profileRequest()
    if (token) {
      if (token.isVerifiedBiker === false) {
        navigate('GowesHubRegScreen')
      }
    }
  }, [])

  useEffect(() => {
    if (region) {
      gowesHubRequest({ latitude: region.latitude, longitude: region.longitude })
      while (i > 1) {
        if (start) {
          setstart(false)
          TimerMixin.setTimeout(() => {
            gowesHubRequest({ latitude: region.latitude, longitude: region.longitude })
            seti(0)
            setstart(true)
          }, 180000)
        }
        seti(i++)
      }
    }
  }, [region])

  useEffect(() => {
    if (getAllBiker && getAllBiker.content) {
      setBikerMarker(getAllBiker.content)

      getAllBiker.content.map((data, i) => {
        switch (data.kategori) {
          case 'Anak Laki-laki':
            tempBikerAnakLaki += 1
            break
          case 'Anak Perempuan':
            tempBikerAnakPerempuan += 1
            break
          case 'Remaja Laki-laki':
            tempBikerRemajaLaki += 1
            break
          case 'Remaja Perempuan':
            tempBikerRemajaPerempuan += 1
            break
          case 'Dewasa Laki-laki':
            tempBikerDewasaLaki += 1
            break
          case 'Dewasa Perempuan':
            tempBikerDewasaPerempuan += 1
            break
        }
      })
      setJumlahBiker(
        tempBikerAnakLaki +
          tempBikerAnakPerempuan +
          tempBikerRemajaLaki +
          tempBikerRemajaPerempuan +
          tempBikerDewasaLaki +
          tempBikerDewasaPerempuan
      )
      setAnakLaki(tempBikerAnakLaki)
      setAnakPerempuan(tempBikerAnakPerempuan)
      setRemajaLaki(tempBikerRemajaLaki)
      setRemajaPerempuan(tempBikerRemajaPerempuan)
      setDewasaLaki(tempBikerDewasaLaki)
      setDewasaPerempuan(tempBikerDewasaPerempuan)
    }
  }, [getAllBiker])

  useEffect(() => {
    if (tokenAPIPayload) {
      gowesHubRequest({ latitude: region.latitude, longitude: region.longitude })
    }
  }, [tokenAPIPayload])

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const checkKategori = (kategori) => {
    switch (kategori) {
      case 'Anak Laki-laki':
        return anakLaki
      case 'Anak Perempuan':
        return anakPerempuan
      case 'Remaja Laki-laki':
        return remajaLaki
      case 'Remaja Perempuan':
        return remajaPerempuan
      case 'Dewasa Laki-laki':
        return dewasaLaki
      case 'Dewasa Perempuan':
        return dewasaPerempuan
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        region={region}
        minZoomLevel={7}
        maxZoomLevel={18}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
      >
        {bikerMarker.map((marker, i) => {
          iconMarker = SetMarker(marker.kategori)
          return (
            <Marker key={i} icon={iconMarker} coordinate={marker.coordinate}>
              <Callout>
                <View>
                  <Text style={styles.calloutTitle}>{marker.fullName}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>
      <View style={styles.counterContainer}>
        <Item>
          <Item spaceBetween row>
            <Item width={'50%'} plain row spaceBetween>
              <Text bold style={{ fontSize: 12 }}>
                {jumlahBiker} Penggowes sedang aktif saat ini.
              </Text>
            </Item>
            <Item plain width={'100%'} style={{ marginEnd: 15 }}>
              <Text bold style={{ fontSize: 12, color: MAROON, justifyContent: 'flex-end' }} onPress={toggleModal}>
                Lihat Detail
              </Text>
            </Item>
          </Item>
        </Item>
      </View>
      <Modal isVisible={visibleModal}>
        <Item plain style={styles.containerListKategori}>
          <FlatList
            data={kategori}
            renderItem={({ item }) => (
              <View style={styles.blok}>
                <TouchableOpacity>
                  <Item plain style={styles.containerIcon}>
                    <Image source={item.image} style={styles.btnCategory} />
                    <Text bold style={{ fontSize: 12, alignSelf: 'center' }}>
                      {item.headline}
                    </Text>
                    <Text bold style={{ fontSize: 12, alignSelf: 'center' }}>
                      {checkKategori(item.headline)}
                    </Text>
                  </Item>
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          <Item small style={{ width: '100%' }}>
            <Button containerStyle={{ backgroundColor: MAROON }} onPress={toggleModal} uppercase>
              Tutup
            </Button>
          </Item>
        </Item>
      </Modal>
      <IconChat navigate={navigate} />
    </View>
  )
}

GowesHub.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  Loading: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  section: {
    marginTop: DOUBLE_BASE_MARGIN,
    paddingHorizontal: SECTION
  },
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
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  containerListKategori: {
    height: 500,
    justifyContent: 'center'
  },
  blok: {
    width: SCREEN_WIDTH * 0.4,
    height: 500 * 0.3,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerIcon: {
    width: SCREEN_WIDTH * 0.4,
    height: 500 * 0.3,
    backgroundColor: WHITE,
    flexDirection: 'column'
  },
  btnCategory: {
    alignSelf: 'center',
    margin: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  counterContainer: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: WHITE,
    position: 'absolute',
    top: !isIphoneX() ? 20 : 20,
    left: 15,
    right: 15,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtCounter: {
    padding: 16,
    fontSize: 14
  },
  searchContainer: {
    position: 'absolute',
    flex: 1
  },
  calloutTitle: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  calloutDescription: {
    fontSize: 14
  }
})

const mapStateToProps = (state) => ({
  getAllBiker: state.getAllBiker.payload,
  token: state.tokenizer.token,
  tokenAPIPayload: state.tokenAPI.payload,
  tenantPayload: state.tenant.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, GowesHubActions, ProfileActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GowesHub)
