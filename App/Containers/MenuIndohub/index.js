import React, { useState, useEffect } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Item, Container, Text, Button, TextInput, RenderIf, PasswordEye } from '../../Presentational'
import TimerMixin from 'react-timer-mixin'
import LoginActions from '../../Redux/LoginRedux'
import { ListMenu } from './Component'
import { Images } from '../../Themes'
import { SCREEN_HEIGHT, SECTION, DOUBLE_BASE_MARGIN } from '../../Themes/Metrics'
import { connect } from 'react-redux'
import { MAROON, LIGHT_GREY, GREY } from '../../Themes/Colors'
import { validateEmail } from '../../Services/Common'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import Fonts from '../../Themes/Fonts'

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
function MenuIndohub(props) {
  const { navigation, token, profileRequest, profilePayload, fetching, loginRequest } = props
  const { navigate } = navigation
  // * Dibutuhkan untuk test
  // const [profile, setProfile] = useState([])
  const [loading, setLoading] = useState(false)
  const [menu] = useState([
    {
      headline: 'Gowes HUB',
      image: Images.ic_goweshub,
      link: () => moveToGowesHUB()
    },
    {
      headline: 'Laporanku',
      image: Images.ic_laporanku_active,
      link: () => navigate('MyReportScreen')
    }
  ])
  const [pressed, setpressed] = useState(false)
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState()
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState()
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  useEffect(() => {
    profileRequest()
    navigation.addListener('willFocus', () => profileRequest())
  }, [])

  useEffect(() => {
    if (profilePayload) {
      if (profilePayload.isSuccess === true) {
        if (pressed) {
          if (profilePayload.isVerifiedBiker === true) {
            navigate('GowesHubScreen')
            setLoading(false)
            setpressed(false)
          } else {
            if (profilePayload) {
              if (profilePayload.content) {
                if (profilePayload.content.isVerifiedBiker) {
                  navigate('GowesHubScreen')
                  setLoading(false)
                  setpressed(false)
                } else {
                  navigate('GowesHubRegScreen')
                  setLoading(false)
                  setpressed(false)
                }
              }
            } else {
              navigate('GowesHubRegScreen')
              setLoading(false)
              setpressed(false)
            }
          }
        }
        // * Dibutuhkan untuk test
        // setProfile(profilePayload.content)
      } else {
        if (token) {
          alert(profilePayload.message)
        }
      }
    }
  }, [profilePayload])

  useEffect(() => {
    if (email && !errorEmail && password && !errorPassword) {
      setErrorEmail()
      setErrorPassword()
      if (!fetching) {
        loginRequest({ email, password })
      }
    }
  }, [errorEmail, errorPassword])

  const moveToGowesHUB = () => {
    setLoading(true)
    if (token) {
      profileRequest()
    } else {
      profileRequest()
    }
    setpressed(true)
  }

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

  return (
    <Container>
      <RenderIf condition={!token}>
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
      </RenderIf>
      <RenderIf condition={token}>
        <Container style={styles.container2} loading={loading}>
          <Text bold style={styles.txtIndoHub}>
            IndoHUB
          </Text>
          <Item plain style={styles.container}>
            <ListMenu menu={menu} />
          </Item>
        </Container>
      </RenderIf>
    </Container>
  )
}

MenuIndohub.navigationOptions = ({ navigation }) => ({
  title: null
})

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
  container: {
    height: SCREEN_HEIGHT,
    justifyContent: 'space-between'
  },
  container2: {
    height: SCREEN_HEIGHT,
    justifyContent: 'space-between',
    margin: 20
  },
  txtIndoHub: {
    fontSize: 20,
    marginBottom: '10%'
  },
  buttonWrapStyle: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: 0
  },
  buttonStyleNext: {
    height: 40,
    margin: 0,
    width: '100%',
    borderRadius: 0,
    backgroundColor: MAROON
  },
  buttonStylePick: {
    height: 40,
    margin: 0,
    width: '100%',
    borderRadius: 0,
    backgroundColor: LIGHT_GREY
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  textStyle: { fontSize: 14, margin: 0 }
})

const mapStateToProps = (state) => ({
  fetching: state.login.fetching,
  error: state.login.error,
  data: state.login.payload,
  token: state.tokenizer.token,
  profilePayload: state.profile.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(LoginActions, TokenizerActions, ProfileActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuIndohub)
