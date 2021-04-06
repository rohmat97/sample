import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import LogoutAction from '../../Redux/LogoutReduxRedux'
import TimerMixin from 'react-timer-mixin'
import {
  Item,
  Text,
  Container,
  RippleTouch,
  RenderIf,
  TextInput,
  Button,
  PasswordEye,
  Modal
} from '../../Presentational'
import { SECTION, DOUBLE_BASE_MARGIN, SCREEN_WIDTH } from '../../Themes/Metrics'
import LoginActions from '../../Redux/LoginRedux'
import { validateEmail } from '../../Services/Common'
import { WHITE_GREY_01, WHITE, GREY } from '../../Themes/Colors'
import { UserImageAndNameProfile } from './Component'
import Images from '../../Themes/Images'
import Fonts from '../../Themes/Fonts'

const ProfileScreen = ({ profile, navigate, toggleModal, visibleModal, handleLogout }) => (
  <Container>
    <Item backgroundColor={WHITE} style={styles.shadow}>
      <Text bold style={styles.title}>
        Profil
      </Text>
    </Item>
    <UserImageAndNameProfile profile={profile} navigate={navigate} />
    <Item plain style={{ justifyContent: 'space-between' }}>
      <RippleTouch onPress={() => navigate('MyProfileScreen')}>
        <Item style={{ borderBottomWidth: 1, borderColor: WHITE_GREY_01 }}>
          <Text bold style={styles.menu}>
            Data Diri
          </Text>
        </Item>
      </RippleTouch>
      <RippleTouch onPress={() => navigate('ChangePasswordScreen')}>
        <Item style={{ borderBottomWidth: 1, borderColor: WHITE_GREY_01 }}>
          <Text bold style={styles.menu}>
            Ubah Password
          </Text>
        </Item>
      </RippleTouch>
      <RippleTouch onPress={() => navigate('AboutUsScreen')}>
        <Item style={{ borderBottomWidth: 1, borderColor: WHITE_GREY_01 }}>
          <Text bold style={styles.menu}>
            Tentang Kami
          </Text>
        </Item>
      </RippleTouch>
      <RippleTouch onPress={toggleModal}>
        <Item style={{ borderBottomWidth: 1, borderColor: WHITE_GREY_01 }}>
          <Text bold style={styles.menu}>
            Keluar
          </Text>
        </Item>
      </RippleTouch>
    </Item>
    <Modal isVisible={visibleModal} containerStyle={SECTION}>
      <Text style={{ fontSize: 14 }}>Anda akan keluar dari aplikasi. Apakah anda ingin keluar sekarang?</Text>
      <Item row style={styles.buttonTidak}>
        <RippleTouch onPress={toggleModal} style={{ width: SCREEN_WIDTH / 2.22, backgroundColor: WHITE_GREY_01 }}>
          <Item>
            <Text center style={{ marginTop: -5 }}>
              Tidak
            </Text>
          </Item>
        </RippleTouch>
        <RippleTouch onPress={handleLogout} style={{ width: SCREEN_WIDTH / 2.22, backgroundColor: '#a01414' }}>
          <Item>
            <Text center style={{ color: WHITE, marginTop: -5 }}>
              Ya, Keluar Sekarang
            </Text>
          </Item>
        </RippleTouch>
      </Item>
    </Modal>
  </Container>
)

const LoginScreen = ({
  setEmail,
  errorEmail,
  email,
  secureTextEntry,
  setPassword,
  errorPassword,
  password,
  renderPasswordAccessory,
  onSubmitPressed,
  fetching,
  navigate,
  navigateToRegister
}) => (
  <Container>
    <Item plain style={styles.containerLogin}>
      <Item plain style={styles.containerLogo}>
        <Image source={Images.illustration_login} style={styles.logo} />
      </Item>
      <Item plain style={styles.containerForm}>
        <Item plain style={styles.textbox}>
          <TextInput
            inputRef={(ref) => (this.email = ref)}
            keyboardType="email-address"
            label={'Email'}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            error={errorEmail}
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => {
              this.password.focus()
            }}
            fontSize={Fonts.size.small}
          />
        </Item>
        <Item plain style={styles.textbox}>
          <TextInput
            secureTextEntry={secureTextEntry}
            inputRef={(ref) => (this.password = ref)}
            label={'Kata Sandi'}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
            error={errorPassword}
            value={password}
            renderAccessory={() => renderPasswordAccessory(secureTextEntry)}
            fontSize={Fonts.size.small}
            returnKeyType="done"
          />
        </Item>
        <Item plain style={styles.forgotText}>
          <Text bold center secondary style={{ paddingLeft: 5 }} onPress={() => navigate('ForgotPasswordScreen')}>
            Lupa kata sandi?
          </Text>
        </Item>
        <Item center style={{ marginTop: 12 }}>
          <Item plain style={{ width: '100%' }}>
            <Button
              secondary
              uppercase
              fetch
              onPress={onSubmitPressed}
              isFetching={fetching}
              containerStyle={{ height: 40, margin: 0 }}
              textStyle={{ fontSize: 14, margin: 0 }}
            >
              MASUK
            </Button>
          </Item>
        </Item>
      </Item>
      <Item plain style={styles.containerLabel}>
        <Item center row style={{ alignSelf: 'center' }}>
          <Text center>Belum punya akun?</Text>
          <Text bold center secondary style={{ paddingLeft: 5 }} onPress={navigateToRegister}>
            Daftar sekarang
          </Text>
        </Item>
        <Item center row style={{ alignSelf: 'center', marginTop: 20 }} />
      </Item>
    </Item>
  </Container>
)

function Profile(props) {
  const {
    token,
    profileRequest,
    profilePayload,
    navigation,
    fetching,
    loginRequest,
    removeToken,
    logoutReduxRequest,
    payloadLogout
  } = props
  const { navigate } = navigation
  const [profile, setProfile] = useState([])
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState()
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [visibleModal, setVisibleModal] = useState(false)
  const [statusLogout, setStatusLogout] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (email && !errorEmail && password && !errorPassword) {
      setErrorEmail()
      setErrorPassword()
      if (!fetching) {
        loginRequest({ email, password })
      }
    }
  }, [errorEmail, errorPassword])

  useEffect(() => {
    if (token !== null) {
      profileRequest()
      navigation.addListener('willFocus', () => profileRequest())
    }
  }, [])

  useEffect(() => {
    if (profilePayload) {
      if (profilePayload.isSuccess) {
        setProfile(profilePayload.content)
        setLoading(false)
      } else {
        if (token) {
          // alert(profilePayload.message)
        }
      }
    }
  }, [profilePayload])

  useEffect(() => {
    if (statusLogout) {
      removeToken()
      setStatusLogout(false)
    }
  }, [payloadLogout])

  const renderPasswordAccessory = (flag) => {
    return <PasswordEye onPress={onAccessoryPress} flag={flag} />
  }
  const onAccessoryPress = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const onSubmitPressed = () => {
    checkEmail() || checkPassword()
  }

  const checkEmail = () => {
    if (!email) setErrorEmail('Harus diisi')
    else if (!validateEmail(email)) setErrorEmail('Email tidak valid')
    else setErrorEmail(null)
  }

  const checkPassword = () => {
    if (!password) setErrorPassword('Harus diisi')
    else setErrorPassword(null)
  }

  const navigateToRegister = () => {
    TimerMixin.setTimeout(() => {
      navigate('RegistrationScreen')
    }, 1000)
  }

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const handleLogout = () => {
    toggleModal()
    logoutReduxRequest()
    setStatusLogout(true)
  }

  return (
    <Container>
      <RenderIf condition={token}>
        <Container loading={loading}>
          <ProfileScreen
            profile={profile}
            navigate={navigate}
            toggleModal={toggleModal}
            visibleModal={visibleModal}
            removeToken={removeToken}
            handleLogout={handleLogout}
          />
        </Container>
      </RenderIf>
      <RenderIf condition={!token}>
        <Container>
          <LoginScreen
            setEmail={setEmail}
            errorEmail={errorEmail}
            email={email}
            secureTextEntry={secureTextEntry}
            setPassword={setPassword}
            errorPassword={errorPassword}
            password={password}
            renderPasswordAccessory={renderPasswordAccessory}
            onSubmitPressed={onSubmitPressed}
            fetching={fetching}
            navigate={navigate}
            navigateToRegister={navigateToRegister}
          />
        </Container>
      </RenderIf>
    </Container>
  )
}

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerLogo: {
    marginVertical: 32
  },
  containerLabel: {
    marginBottom: '5%'
  },
  section: {
    marginTop: DOUBLE_BASE_MARGIN,
    paddingHorizontal: SECTION
  },
  btnLogin: {
    marginTop: 30
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
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  containerForm: {
    marginHorizontal: 40,
    marginTop: -40
  },
  containerFooter: {
    marginHorizontal: 40
  },
  textbox: {
    marginVertical: -7
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
  title: {
    fontWeight: 'bold',
    marginLeft: 40,
    marginVertical: 5,
    fontSize: 20
  },
  menu: {
    fontSize: 16,
    marginLeft: 20
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
  buttonTidak: {
    width: '100%',
    height: 50,
    marginBottom: -30,
    marginLeft: -20
  }
})

const mapStateToProps = (state) => ({
  fetching: state.login.fetching,
  error: state.login.error,
  data: state.login.payload,
  token: state.tokenizer.token,
  profilePayload: state.profile.payload,
  payloadLogout: state.logout.payload,
  fetchingLogout: state.logout.fetching
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(LoginActions, TokenizerActions, ProfileActions, LogoutAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
