import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, Image, View } from 'react-native'
import { Images } from '../../Themes'
import { Item, Text, Container, TextInput, Section, RippleTouch, Icon, Button } from '../../Presentational'
import { WHITE, GREY, WHITE_GREY_03, MAROON } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { getFileName } from '../../Transforms/Common'
import Fonts from '../../Themes/Fonts'
import { bindActionCreators } from 'redux'
import GowesHubRegActions from '../../Redux/GowesHubRegRedux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import DatePicker from 'react-native-datepicker'
import { RegisterInvitation, RegisterDone } from './Component'

const PhotoWrapper = ({ pickImage, removePhoto, src }) => {
  if (!src) {
    return (
      <RippleTouch onPress={pickImage} style={styles.boxImage}>
        <Image source={Images.addPhoto} style={styles.btnTakePhoto} />
        <Text tiny style={{ textAlign: 'center', marginTop: 11 }}>
          Ambil foto diri anda dengan sepeda yang anda gunakan
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

function Register(props) {
  const { navigation, token, gowesHubRegRequest, profileRequest, profilePayload, fetching } = props
  const { navigate } = navigation
  const [id, setId] = useState('')
  const [fullName, setFullName] = useState('')
  const [errorFullName] = useState()
  const [placeOfBirth, setPlaceOfBirth] = useState('')
  const [errorPlaceOfBirth] = useState()
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorPhoneNumber] = useState()
  const [gender, setGender] = useState('')
  const [errorGender] = useState()
  const [job, setJob] = useState('')
  const [errorJob] = useState()
  const [bikeType, setBikeType] = useState('')
  const [errorBikeType] = useState()
  const [bikeExperience, setBikeExperience] = useState('')
  const [errorBikeExperience] = useState()
  const [photo, setPhoto] = useState(null)
  const [show, setShow] = useState(false)
  const [profile, setProfile] = useState([])

  useEffect(() => {
    if (!token) navigate('LoginScreen')
    else if (token.isVerifiedBiker) navigate('GowesHubScreen')
    else {
      setId(token.id)
      setFullName(token.fullName)
      setDateOfBirth(token.dateOfBirth)
      setPlaceOfBirth(token.placeOfBirth)
      setGender(token.gender)
      setPhoneNumber(token.phoneNumber)
      setJob(token.job)
      profileRequest()
    }
  }, [])

  useEffect(() => {
    if (profilePayload) {
      if (profilePayload.isSuccess) {
        setProfile(profilePayload.content)
      } else {
        // alert(profilePayload.message)
      }
    }
  }, [profilePayload])

  const regGoweHub = () => {
    gowesHubRegRequest({
      id,
      fullName,
      placeOfBirth,
      dateOfBirth,
      phoneNumber,
      job,
      gender,
      bikeType,
      bikeExperience,
      images: photo
    })
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

  const RegisterForm = () => {
    return (
      <ScrollView>
        <Item plain style={styles.container}>
          <Item plain style={styles.containerForm}>
            <Text left bold style={styles.txtProfile}>
              PROFIL
            </Text>
            <Item plain style={styles.textbox}>
              <TextInput
                disabled
                inputRef={(ref) => (this.fullName = ref)}
                keyboardType="default"
                placeholder={'Masukan nama anda disini'}
                label={'Nama'}
                onChangeText={(fullName) => setFullName(fullName)}
                error={errorFullName}
                value={token.fullName}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.fullName.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item plain style={styles.textbox}>
              <TextInput
                disabled
                keyboardType="email-address"
                placeholder={'Masukan Email anda disini'}
                label={'Email'}
                value={token.email}
                autoCapitalize="none"
                returnKeyType="next"
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.placeOfBirth = ref)}
                keyboardType="default"
                placeholder={'Masukan tempat lahir anda disini'}
                label={'Tempat Tanggal Lahir'}
                onChangeText={(placeOfBirth) => setPlaceOfBirth(placeOfBirth)}
                error={errorPlaceOfBirth}
                value={placeOfBirth}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.placeOfBirth.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <DatePicker
              style={{ width: 200 }}
              date={dateOfBirth}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1950-01-01"
              maxDate="2015-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(dateOfBirth) => {
                setDateOfBirth(dateOfBirth)
              }}
            />
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.phoneNumber = ref)}
                keyboardType="default"
                placeholder={'Masukan jenis kelamin anda disini'}
                label={'Jenis Kelamin'}
                onChangeText={(gender) => setGender(gender)}
                error={errorGender}
                value={gender}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.gender.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.phoneNumber = ref)}
                keyboardType="phone-pad"
                placeholder={'Masukan no. telepon anda disini'}
                label={'No. Telepon'}
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                error={errorPhoneNumber}
                value={phoneNumber}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.phoneNumber.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.job = ref)}
                keyboardType="default"
                placeholder={'Masukan pekerjaan anda disini'}
                onChangeText={(job) => setJob(job)}
                error={errorJob}
                label={'Pekerjaan'}
                value={job}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.job.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
          </Item>
          <Item plain style={styles.containerForm}>
            <Text left bold style={styles.txtInformasiSepeda}>
              INFORMASI SEPEDA
            </Text>
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.bikeType = ref)}
                keyboardType="default"
                placeholder={'Masukan jenis sepeda anda disini'}
                label={'Jenis Sepeda'}
                onChangeText={(bikeType) => setBikeType(bikeType)}
                error={errorBikeType}
                value={bikeType}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.bikeType.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item plain style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.bikeExperience = ref)}
                keyboardType="default"
                placeholder={'Masukan pengalaman bersepeda anda disini'}
                label={'Pengalaman Bersepeda'}
                onChangeText={(bikeExperience) => setBikeExperience(bikeExperience)}
                error={errorBikeExperience}
                value={bikeExperience}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.bikeExperience.focus()
                }}
                fontSize={Fonts.size.medium}
              />
            </Item>
            <Item center plain style={styles.textbox}>
              <Text bold left style={{ alignSelf: 'flex-start', marginTop: 5 }}>
                Foto Diri &amp; Sepeda
              </Text>
              <Section>
                <PhotoWrapper src={photo} pickImage={pickAnImageHandler} removePhoto={removePhoto} />
              </Section>
            </Item>
          </Item>
          <Item center>
            <Item plain style={{ width: '100%' }}>
              <Button
                uppercase
                onPress={regGoweHub}
                fetch
                containerStyle={styles.btnRegistContainer}
                textStyle={{ fontSize: 14, margin: 0 }}
                isFetching={fetching}
              >
                REGISTRASI
              </Button>
            </Item>
          </Item>
        </Item>
      </ScrollView>
    )
  }

  if (show === false) {
    if (token) {
      if (!profile.isVerifiedBiker && profile.imageBike != null)
        return (
          <Container>
            <RegisterDone />
          </Container>
        )
      else if (!profile.isVerifiedBiker && profile.imageBike == null)
        return (
          <Container>
            <RegisterInvitation setShow={setShow} />
          </Container>
        )
    } else
      return (
        <Container>
          <RegisterInvitation setShow={setShow} />
        </Container>
      )
  } else {
    return <Container style={{ marginBottom: 0 }}>{RegisterForm()}</Container>
  }
}

Register.navigationOptions = ({ navigation }) => ({
  title: 'Daftar Gowes HUB'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerForm: {
    marginHorizontal: 20,
    marginTop: '10%'
  },
  txtProfile: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10
  },
  txtInformasiSepeda: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 10
  },
  btnRegistContainer: {
    height: 40,
    margin: 0,
    marginBottom: 0,
    backgroundColor: MAROON,
    borderRadius: 0
  },
  textbox: {
    marginVertical: -7,
    marginBottom: 5
  },
  boxImage: {
    backgroundColor: WHITE_GREY_03,
    borderColor: GREY,
    borderStyle: 'dashed',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 2.5,
    width: SCREEN_WIDTH / 2,
    alignSelf: 'center',
    marginTop: 24
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
  fetching: state.gowesHubReg.fetching,
  error: state.gowesHubReg.error,
  profilePayload: state.profile.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, GowesHubRegActions, ProfileActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
