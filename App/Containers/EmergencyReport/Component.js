import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { Item, Text, RippleTouch, Section, TextInput, RenderIf, Button, Icon } from '../../Presentational'
import { WHITE, WHITE_GREY_03, GREY, LIGHT_GREY, MAROON } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH, DOUBLE_BASE_MARGIN, SECTION } from '../../Themes/Metrics'
import { Images } from '../../Themes'
import Fonts from '../../Themes/Fonts'

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

export const FormLaporan = ({
  photo,
  pickAnImageHandler,
  removePhoto,
  locationDetail,
  setlocationDetail,
  token,
  pop,
  sendReport,
  navigate,
  fetching
}) => (
  <Item plain style={styles.container}>
    <Item plain style={styles.containerForm}>
      <Item center plain style={styles.textbox}>
        <Text bold left style={{ alignSelf: 'flex-start' }}>
          Foto
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
          label={'Keterangan tambahan*'}
          onChangeText={(locationDetail) => setlocationDetail(locationDetail)}
          value={locationDetail}
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
              onPress={() => pop()}
            >
              Batalkan
            </Button>
            <Button
              secondary
              uppercase
              fetch
              containerStyle={styles.buttonStyle2}
              textStyle={{ fontSize: 14, margin: 0 }}
              onPress={sendReport}
              isFetching={fetching}
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
              onPress={() => navigate('ProfileScreen')}
            >
              Login
            </Button>
          </Item>
        </RenderIf>
      </Item>
    </Item>
  </Item>
)

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
    marginTop: 20
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
