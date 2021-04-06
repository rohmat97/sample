import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UpgradeUserActions from '../../Redux/UpgradeUserRedux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { Container, Item, Text, RippleTouch, Button, Section, Icon } from '../../Presentational'
import { Images } from '../../Themes'
import { WHITE_GREY_03, WHITE, GREY, MAROON } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { getFileName } from '../../Transforms/Common'
import { LayoutNoKTP } from './Component'

const PhotoWrapper = ({ pickImage, removePhoto, src }) => {
  if (!src) {
    return (
      <RippleTouch onPress={pickImage} style={styles.boxImage}>
        <Image source={Images.addPhoto} style={styles.btnTakePhoto} />
        <Text tiny style={{ textAlign: 'center', marginTop: 11 }}>
          Ketuk Disini untuk Mengambil Foto KTP
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

const PhotoWrapper2 = ({ pickImage2, removePhoto2, src2 }) => {
  if (!src2) {
    return (
      <RippleTouch onPress={pickImage2} style={styles.boxImage2}>
        <Image source={Images.addPhoto} style={styles.btnTakePhoto} />
        <Text tiny style={{ textAlign: 'center', marginTop: 11 }}>
          Ketuk Disini untuk Mengambil Foto Diri + KTP (Seperti contoh gambar sebelah kiri)
        </Text>
      </RippleTouch>
    )
  } else {
    return (
      <View>
        <View style={styles.boxImage2}>
          <Image source={src2} style={styles.thumbnailPhoto} />
        </View>
        <Icon name="close-circle" size="24" style={styles.deletePhoto2} onPress={removePhoto2} />
      </View>
    )
  }
}

function UpgradeUserScreen(props) {
  const { navigation, token, upgradeUserRequest, fetching } = props
  const { navigate } = navigation
  const [photo, setPhoto] = useState(null)
  const [photo2, setPhoto2] = useState(null)
  const [IdCardNumber, setIdCardNumber] = useState('')
  const [errorIdCardNumber] = useState()

  useEffect(() => {
    if (!token) navigate('LoginScreen')
  }, [])

  const upgradeUser = () => {
    if (IdCardNumber && photo && photo2) {
      upgradeUserRequest({
        IdCardNumber,
        ImageKTP: photo,
        ImageUserAndKTP: photo2
      })
    } else alert('Data Anda Belum Lengkap !')
  }

  const pickAnImageHandler = () => {
    const { navigate } = props.navigation
    navigate('TakePhotoScreen', { facing: 'back', borderType: 'none', source: setImage })
  }

  const pickAnImageHandler2 = () => {
    const { navigate } = props.navigation
    navigate('TakePhotoScreen', { facing: 'back', borderType: 'none', source: setImage2 })
  }

  const setImage = (imageUri) => {
    setPhoto({
      uri: imageUri,
      static: true,
      type: 'image/jpeg',
      name: getFileName(imageUri)
    })
  }

  const setImage2 = (imageUri) => {
    setPhoto2({
      uri: imageUri,
      static: true,
      type: 'image/jpeg',
      name: getFileName(imageUri)
    })
  }

  const removePhoto = () => {
    setPhoto(null)
  }

  const removePhoto2 = () => {
    setPhoto2(null)
  }

  return (
    <Container>
      <ScrollView>
        <Item plain style={styles.container}>
          <LayoutNoKTP
            IdCardNumber={IdCardNumber}
            errorIdCardNumber={errorIdCardNumber}
            setIdCardNumber={setIdCardNumber}
          />
          <Item plain style={styles.containerForm}>
            <Item center plain style={styles.textbox}>
              <Text left style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>
                Foto KTP
              </Text>
              <Section>
                <PhotoWrapper src={photo} pickImage={pickAnImageHandler} removePhoto={removePhoto} />
              </Section>
            </Item>
          </Item>
          <Item plain style={styles.containerForm}>
            <Item plain style={styles.textbox}>
              <Text left style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>
                Foto Diri + KTP
              </Text>
              <Item row>
                <Image source={Images.example_KTP} style={styles.boxImage2} />
                <Section>
                  <PhotoWrapper2 src2={photo2} pickImage2={pickAnImageHandler2} removePhoto2={removePhoto2} />
                </Section>
              </Item>
            </Item>
          </Item>
          <Item center>
            <Item plain style={{ width: '100%' }}>
              <Button
                uppercase
                onPress={upgradeUser}
                fetch
                containerStyle={styles.containerButton}
                textStyle={{ fontSize: 14, margin: 0 }}
                isFetching={fetching}
              >
                DAFTAR VERIFIKASI AKUN
              </Button>
            </Item>
          </Item>
        </Item>
      </ScrollView>
    </Container>
  )
}

UpgradeUserScreen.navigationOptions = () => ({
  title: 'Verifikasi Akun'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerForm: {
    marginHorizontal: 20,
    marginTop: '5%'
  },
  textbox: {
    marginVertical: -7
  },
  boxImage: {
    backgroundColor: WHITE_GREY_03,
    borderColor: GREY,
    borderStyle: 'dashed',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 4,
    width: SCREEN_WIDTH / 1.5,
    alignSelf: 'center',
    marginTop: 5
  },
  boxImage2: {
    backgroundColor: WHITE_GREY_03,
    borderColor: GREY,
    borderStyle: 'dashed',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 2.8,
    width: SCREEN_WIDTH / 2.3,
    alignSelf: 'center',
    marginLeft: -5
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
    marginTop: 3,
    marginRight: 20,
    right: (20 * SCREEN_WIDTH) / 100
  },
  deletePhoto2: {
    zIndex: 99999999,
    position: 'absolute',
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 50,
    fontSize: 30,
    backgroundColor: 'transparent',
    color: WHITE,
    marginRight: -18,
    right: (20 * SCREEN_WIDTH) / 100
  },
  containerButton: {
    height: 40,
    margin: 0,
    marginBottom: 0,
    backgroundColor: MAROON,
    borderRadius: 0
  }
})

const mapStateToProps = (state) => ({
  upgradeUser: state.upgradeUser.payload,
  token: state.tokenizer.token,
  success: state.upgradeUser.payload,
  error: state.upgradeUser.error,
  fetching: state.upgradeUser.fetching
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UpgradeUserActions, TokenizerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeUserScreen)
