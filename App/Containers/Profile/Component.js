import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { Images } from '../../Themes'
import { Item, Text, RippleTouch, RenderIf, Footer, TextInput, Icon } from '../../Presentational'
import { WHITE_GREY_01, RED, YELLOW, GREEN, WHITE } from '../../Themes/Colors'
import Fonts from '../../Themes/Fonts'
import { SCREEN_WIDTH } from '../../Themes/Metrics'
import dayjs from 'dayjs'

export const UserImageAndNameMyProfile = ({ profile, showPicker, src, removePhoto, saveImage, fetching }) => {
  if (!src) {
    return (
      <Item center plain style={{ marginTop: 20 }}>
        <Image
          source={profile.imageUrl ? { uri: encodeURI(profile.imageUrl) } : Images.ic_default_user}
          style={styles.logo}
        />
        <RippleTouch onPress={showPicker} style={styles.boxImage}>
          <Image source={Images.addPhoto} style={styles.btnTakePhoto} />
        </RippleTouch>
        <Item center plain style={{ marginTop: 15 }}>
          <Text center plain style={styles.name}>
            {profile.fullName}
          </Text>
        </Item>
      </Item>
    )
  } else {
    return (
      <Item center plain style={{ marginTop: 20 }}>
        <Image source={src} style={styles.logo} />
        <Icon name="close-circle" size="24" style={styles.deletePhoto} onPress={removePhoto} />
        <RippleTouch onPress={saveImage} fetch isFetching={fetching} style={styles.boxSaveImage}>
          <Icon name="check" size="18" style={styles.btnSavePhoto} />
        </RippleTouch>
        <Item center plain style={{ marginTop: 15 }}>
          <Text center plain style={styles.name}>
            {profile.fullName}
          </Text>
        </Item>
      </Item>
    )
  }
}

export const UserImageAndNameProfile = ({ profile, navigate }) => (
  <Item plain row style={styles.user}>
    <ImageUser profile={profile} />
    <Item plain>
      <Text bold style={styles.nameProfile}>
        {profile && profile.fullName ? profile.fullName : ''}
      </Text>
      <Text bold style={{ marginLeft: 15, marginBottom: 15 }}>
        {profile && profile.email ? profile.email : ''}
      </Text>
      <RenderIf condition={profile && profile.statusVerified === 1 ? profile.statusVerified === 1 : ''}>
        <Item style={styles.buttonVerified}>
          <Text bold style={styles.textVerified}>
            Akun Anda Telah Terverifikasi
          </Text>
        </Item>
      </RenderIf>
      <RenderIf condition={profile && profile.statusVerified === 2 ? profile.statusVerified === 2 : ''}>
        <RippleTouch onPress={() => navigate('UpgradeUserScreen')}>
          <Item style={styles.buttonFailedVerified}>
            <Text bold style={styles.textFailedVerified}>
              Gagal Verifikasi Akun, Coba Lagi !
            </Text>
          </Item>
        </RippleTouch>
      </RenderIf>
      <RenderIf condition={profile && profile.statusVerified === 3 ? profile.statusVerified === 3 : ''}>
        <Item style={styles.buttonWaitingVerified}>
          <Text bold style={styles.textWaitingVerified}>
            Menunggu Proses Verifikasi Akun
          </Text>
        </Item>
      </RenderIf>
      <RenderIf condition={profile && profile.statusVerified === 0 ? profile.statusVerified === 0 : ''}>
        <RippleTouch onPress={() => navigate('UpgradeUserScreen')}>
          <Item style={styles.buttonFailedVerified}>
            <Text bold style={styles.textFailedVerified}>
              Verifikasi Akun
            </Text>
          </Item>
        </RippleTouch>
      </RenderIf>
    </Item>
  </Item>
)

export const UserProfile = ({ profile }) => (
  <Item plain style={{ marginTop: 20 }}>
    <TextBox profile={profile} kiriman={'Email'} />
    <TextBox profile={profile} kiriman={'TempatTanggalLahir'} />
    <TextBox profile={profile} kiriman={'JenisKelamin'} />
    <TextBox profile={profile} kiriman={'NoHP'} />
    <TextBox profile={profile} kiriman={'Pekerjaan'} />
  </Item>
)

export const AboutUsBox = () => (
  <Item row plain>
    <Item plain style={{ marginTop: 20 }}>
      <Image source={Images.ic_indohub} style={styles.logoAboutUs} />
    </Item>
    <Item plain style={styles.textBoxAboutUs}>
      <Text plain style={styles.textAboutUs}>
        Kami hadir untuk memberikan solusi kepada masyarakat untuk menginformasikan dan mengurai kemacetan lalu lintas
        secara langsung.
      </Text>
    </Item>
  </Item>
)

export const AboutUsFooter = ({ version }) => (
  <Footer borderWidth={0} backgroundColor={'transparent'}>
    <Item center>
      <Text>v.{version.versionApps}</Text>
    </Item>
  </Footer>
)

export const LayoutNoKTP = ({ IdCardNumber, errorIdCardNumber, setIdCardNumber }) => (
  <Item plain style={styles.textbox2}>
    <Item style={{ marginBottom: -30 }}>
      <Text style={{ alignSelf: 'flex-start', fontWeight: 'bold' }}>No. KTP</Text>
    </Item>
    <TextInput
      inputRef={(ref) => (this.IdCardNumber = ref)}
      keyboardType="number-pad"
      placeholder={'Masukan nomor KTP anda disini'}
      onChangeText={(IdCardNumber) => setIdCardNumber(IdCardNumber)}
      error={errorIdCardNumber}
      value={IdCardNumber}
      autoCapitalize="none"
      returnKeyType="next"
      onSubmitEditing={() => {
        this.IdCardNumber.focus()
      }}
      fontSize={Fonts.size.medium}
      required
    />
  </Item>
)

const ImageUser = ({ profile }) => (
  <Item plain>
    <Image
      source={profile && profile.imageUrl ? { uri: profile.imageUrl } : Images.ic_default_user}
      style={styles.logoProfile}
    />
  </Item>
)

const TextBox = ({ profile, kiriman }) => (
  <Item plain style={styles.textBox}>
    <Text style={styles.textFile}>
      <RenderIf condition={kiriman === 'Email'}>Email</RenderIf>
      <RenderIf condition={kiriman === 'TempatTanggalLahir'}>Tempat & Tanggal Lahir</RenderIf>
      <RenderIf condition={kiriman === 'JenisKelamin'}>Jenis Kelamin</RenderIf>
      <RenderIf condition={kiriman === 'NoHP'}>No. HP</RenderIf>
      <RenderIf condition={kiriman === 'Pekerjaan'}>Pekerjaan</RenderIf>
    </Text>
    <Text style={styles.text}>
      <RenderIf condition={kiriman === 'Email'}>{profile.email}</RenderIf>
      <RenderIf condition={kiriman === 'TempatTanggalLahir'}>
        {profile.placeOfBirth}, {dayjs(profile.dateOfBirth).format('DD-MM-YYYY')}
      </RenderIf>
      <RenderIf condition={kiriman === 'JenisKelamin'}>{profile.gender}</RenderIf>
      <RenderIf condition={kiriman === 'NoHP'}>{profile.phoneNumber}</RenderIf>
      <RenderIf condition={kiriman === 'Pekerjaan'}>{profile.job}</RenderIf>
    </Text>
  </Item>
)

const styles = StyleSheet.create({
  logo: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    borderRadius: 75,
    height: 150,
    width: 150
  },
  logoAboutUs: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    borderRadius: 15,
    height: 90,
    width: 130,
    marginLeft: 15
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  textFile: {
    fontWeight: 'bold',
    fontSize: 14
  },
  text: {
    marginTop: 5,
    marginBottom: 5
  },
  textAboutUs: {
    fontSize: 14,
    marginTop: 5,
    color: '#4a4a4a'
  },
  textBox: {
    marginTop: 10,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: WHITE_GREY_01
  },
  textBoxAboutUs: {
    marginTop: 15,
    width: '55%',
    marginHorizontal: 5
  },
  user: {
    marginHorizontal: 16,
    marginVertical: 15
  },
  logoProfile: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  },
  nameProfile: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold'
  },
  textFailedVerified: {
    marginHorizontal: 5,
    marginVertical: -7,
    color: RED,
    textAlign: 'center'
  },
  buttonFailedVerified: {
    marginLeft: 15,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 5
  },
  buttonWaitingVerified: {
    marginLeft: 15,
    borderWidth: 1,
    borderColor: YELLOW,
    borderRadius: 5
  },
  textWaitingVerified: {
    marginHorizontal: 5,
    marginVertical: -7,
    color: YELLOW,
    textAlign: 'center'
  },
  buttonVerified: {
    marginLeft: 15,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 5
  },
  textVerified: {
    marginHorizontal: 5,
    marginVertical: -7,
    color: GREEN,
    textAlign: 'center'
  },
  textbox2: {
    marginVertical: 5,
    marginHorizontal: 20
  },
  boxImage: {
    backgroundColor: WHITE_GREY_01,
    borderColor: WHITE_GREY_01,
    height: 30,
    width: 30,
    marginTop: -25,
    marginRight: -100,
    borderWidth: 1,
    borderRadius: 15
  },
  btnTakePhoto: {
    width: 25,
    height: 25,
    alignSelf: 'center'
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
    marginRight: 80,
    right: (20 * SCREEN_WIDTH) / 100
  },
  btnSavePhoto: {
    fontSize: 30,
    color: GREEN,
    alignSelf: 'center'
  },
  boxSaveImage: {
    backgroundColor: 'transparent',
    borderColor: WHITE_GREY_01,
    height: 30,
    width: 30,
    marginTop: -25,
    marginRight: -120,
    borderWidth: 2,
    borderRadius: 15
  }
})
