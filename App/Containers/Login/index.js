import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image } from 'react-native'
import TimerMixin from 'react-timer-mixin'
import { StackActions, NavigationActions } from 'react-navigation'
import { TextInput, Container, Item, Text, PasswordEye, Button } from '../../Presentational'
import { validateEmail } from '../../Services/Common'
import { SECTION, DOUBLE_BASE_MARGIN } from '../../Themes/Metrics'
import LoginActions from '../../Redux/LoginRedux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { GREY } from '../../Themes/Colors'
import Images from '../../Themes/Images'
import Fonts from '../../Themes/Fonts'
import PropTypes from 'prop-types'

function Login(props) {
  const { navigation, fetching, loginRequest } = props
  const { navigate } = navigation
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState()
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState()
  const [secureTextEntry, setSecureTextEntry] = useState(true)

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
    // console.tron.log('component did mount')
    // BackHandler.addEventListener('login', back)
    return () =>
      // console.tron.log('will unmount')
      // BackHandler.remove('login', back)
      props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MainTabScreen' })]
        })
      )
  }, [])

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
      <Item plain style={styles.container}>
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
}

Login.navigationOptions = () => ({
  header: null
})

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  secureTextEntry: PropTypes.bool
}

Login.defaultProps = {
  email: '',
  password: '',
  secureTextEntry: true
}

const styles = StyleSheet.create({
  container: {
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
  }
})

const mapStateToProps = (state) => ({
  fetching: state.login.fetching,
  error: state.login.error,
  data: state.login.payload,
  token: state.tokenizer.token
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(LoginActions, TokenizerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
