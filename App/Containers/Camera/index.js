import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Image, StyleSheet, View } from 'react-native'
import { Images } from '../../Themes'
import {
  Item,
  Text,
  Container,
  TextInput,
  Button,
  RippleTouch,
  Section,
  Icon,
  RenderIf,
  Modal
} from '../../Presentational'
import { WHITE, GREY, LIGHT_GREY, WHITE_GREY_03, MAROON } from '../../Themes/Colors'
import { SECTION, DOUBLE_BASE_MARGIN, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { getFileName } from '../../Transforms/Common'
import TokenizerActions from '../../Redux/TokenizerRedux'
import Fonts from '../../Themes/Fonts'
import ReportActions from '../../Redux/ReportRedux'
import TenantActions from '../../Redux/TenantRedux'

const PhotoWrapper = ({ pickImage, removePhoto, src }) => {
  if (!src) {
    return (
      <RippleTouch onPress={pickImage} style={styles.boxImage}>
        <Image source={Images.addPhoto} style={styles.btnTakePhoto} />
        <Text tiny style={{ textAlign: 'center', marginTop: 11 }}>
          Tap di sini untuk mengambil foto
        </Text>
      </RippleTouch>
    )
  } else {
    return (
      <View>
        <View style={styles.boxImage}>
          <Image source={src} style={styles.thumbnailPhoto} />
        </View>
        <Icon name="close-circle" size="24" style={styles.deletePhoto} onPress={removePhoto} />
      </View>
    )
  }
}

function Report(props) {
  const { token, tokenAPIPayload, tenantRequest, navigation } = props
  const { navigate } = navigation
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [headline, setHeadline] = useState('')
  const [errorHeadline, setErrorHeadline] = useState()
  const [deskripsi, setDeskripsi] = useState('')
  const [errorDeskripsi, setErrorDeskripsi] = useState()
  const [visibleModal, setVisibleModal] = useState(false)
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    if (token && tokenAPIPayload) {
      tenantRequest()
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  useEffect(() => {
    if (headline && !errorHeadline && deskripsi && !errorDeskripsi) {
      setErrorHeadline()
      setErrorDeskripsi()
    }
  }, [errorHeadline, errorDeskripsi])

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const pickAnImageHandler = () => {
    const { navigate } = props.navigation
    navigate('TakePhotoScreen', { facing: 'back', borderType: 'none', source: setImage })
  }

  const setImage = (imageUri) => {
    setPhoto({
      uri: imageUri,
      static: true,
      type: 'image/jpeg',
      name: getFileName(imageUri)
    })
  }

  const removePhoto = () => {
    setPhoto(null)
  }

  return (
    <Container>
      <Item plain style={styles.container}>
        <Item plain style={styles.containerForm}>
          <Text bold left style={{ alignSelf: 'flex-start', fontSize: 16 }}>
            Buat Laporan
          </Text>
          <Item plain style={styles.textbox}>
            <TextInput
              inputRef={(ref) => (this.headline = ref)}
              keyboardType="default"
              placeholder={'Tuliskan keterangan singkat disini'}
              label={'Headline*'}
              autoCapitalize="none"
              onChangeText={(headline) => setHeadline(headline)}
              error={errorHeadline}
              value={headline}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.deskripsi.focus()
              }}
              fontSize={Fonts.size.medium}
            />
          </Item>
          <Item center plain style={styles.textbox}>
            <Text bold left style={{ alignSelf: 'flex-start' }}>
              Foto*
            </Text>
            <Section>
              <PhotoWrapper src={photo} pickImage={pickAnImageHandler} removePhoto={removePhoto} />
            </Section>
          </Item>
          <Item plain style={styles.textbox}>
            <TextInput
              inputRef={(ref) => (this.deskripsi = ref)}
              keyboardType="default"
              placeholder={'Tuliskan keterangan tambahan disini'}
              label={'Keterangan tambahan'}
              onChangeText={(deskripsi) => setDeskripsi(deskripsi)}
              error={errorDeskripsi}
              value={deskripsi}
              autoCapitalize="none"
              returnKeyType="done"
              fontSize={Fonts.size.medium}
            />
          </Item>
          <Item center style={{ marginTop: 12 }}>
            <RenderIf condition={token}>
              <Item plain style={styles.buttonWrapStyle}>
                <Button
                  secondary
                  uppercase
                  containerStyle={styles.buttonStyle1}
                  textStyle={{ fontSize: 14, margin: 0 }}
                >
                  Batalkan
                </Button>
                <Button
                  secondary
                  uppercase
                  containerStyle={styles.buttonStyle2}
                  textStyle={{ fontSize: 14, margin: 0 }}
                  onPress={toggleModal}
                >
                  Kirim Laporan
                </Button>
              </Item>
            </RenderIf>
            <RenderIf condition={!token}>
              <Item plain style={styles.buttonWrapStyle}>
                <Button
                  secondary
                  uppercase
                  containerStyle={styles.buttonStyleLogin}
                  textStyle={{ fontSize: 14, margin: 0 }}
                  onPress={() => navigate('LoginScreen')}
                >
                  Login
                </Button>
              </Item>
            </RenderIf>
          </Item>
        </Item>
      </Item>
      <Modal isVisible={visibleModal} containerStyle={SECTION}>
        <Item style={{ width: '100%', paddingBottom: 0 }}>
          <Text large>
            Id dan Nama: {token.id}, {token.fullName}
          </Text>
          <Text large>
            LatLong: {latitude}, {longitude}
          </Text>
          <Text large>Headline: {headline}</Text>
          <Text large>Keterangan tambahan: {deskripsi}</Text>
          <Text large>Type: 0</Text>
          <Item small style={{ width: '45%' }}>
            <Button secondary onPress={toggleModal} uppercase>
              Tutup
            </Button>
          </Item>
        </Item>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerLogo: {
    marginTop: '10%'
  },
  containerLabel: {
    marginBottom: '5%'
  },
  section: {
    marginTop: DOUBLE_BASE_MARGIN,
    paddingHorizontal: SECTION
  },
  forgotText: {
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  illustratorBottom: {
    position: 'absolute',
    bottom: 0,
    height: 154
  },
  containerForm: {
    marginHorizontal: 40,
    marginTop: '10%'
  },
  containerFooter: {
    marginHorizontal: 40
  },
  textbox: {
    marginVertical: -7,
    marginBottom: 5
  },
  softGrey: {
    color: GREY
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  buttonWrapStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
  },
  buttonStyle1: {
    height: 40,
    margin: 0,
    width: '50%',
    borderRadius: 0,
    backgroundColor: LIGHT_GREY
  },
  buttonStyle2: {
    height: 40,
    margin: 0,
    width: '50%',
    borderRadius: 0,
    backgroundColor: MAROON
  },
  buttonStyleLogin: {
    height: 40,
    margin: 0,
    width: '100%',
    borderRadius: 0,
    backgroundColor: MAROON
  },
  // Camera
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  boxImage: {
    backgroundColor: WHITE_GREY_03,
    borderColor: GREY,
    borderStyle: 'dashed',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 2.5,
    width: SCREEN_WIDTH / 2,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 32
  },
  btnTakePhoto: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginLeft: -5
  },
  thumbnailPhoto: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 3
  },
  deletePhoto: {
    zIndex: 99999999,
    position: 'absolute',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 50,
    fontSize: 30,
    backgroundColor: 'transparent',
    color: WHITE,
    marginTop: 18,
    marginRight: -18,
    right: (20 * SCREEN_WIDTH) / 100
  }
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  tokenAPIPayload: state.tokenAPI.payload,
  tenant: state.tenant.payload,
  tenantPayload: state.tenant.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, ReportActions, TenantActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
