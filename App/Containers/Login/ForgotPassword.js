import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image } from 'react-native'
import { TextInput, Container, Item, Text, Button, Modal } from '../../Presentational'
import { validateEmail } from '../../Services/Common'
import { SECTION, DOUBLE_BASE_MARGIN } from '../../Themes/Metrics'
import ForgotPasswordActions from '../../Redux/ForgotPasswordRedux'
import { GREY } from '../../Themes/Colors'
import Images from '../../Themes/Images'
import Fonts from '../../Themes/Fonts'
import PropTypes from 'prop-types'
import TimerMixin from 'react-timer-mixin'

function ForgotPassword(props) {
  const { navigation, fetching, forgotPasswordRequest, payload } = props
  const [email, setEmail] = useState('')
  const [modalSuccess, setModalSuccess] = useState(false)
  const [errorEmail, setErrorEmail] = useState()

  useEffect(() => {
    if (email && payload && payload.isSuccess) {
      setModalSuccess(true)
    }
  }, [payload])

  const checkEmail = () => {
    if (!email) setErrorEmail('Harus diisi')
    else if (!validateEmail(email)) setErrorEmail('Email tidak valid')
    else {
      setErrorEmail()
      forgotPasswordRequest({ email })
    }
  }

  return (
    <Container>
      <Item plain style={styles.container}>
        <Item plain style={styles.containerLogo}>
          <Image source={Images.illustration_login} style={styles.logo} />
        </Item>
        <Item plain style={styles.containerForm}>
          <Item small>
            <Text bold>Lupa Kata Sandi</Text>
            <Text>Kami akan mengirimkan tautan ke email ini untuk pemulihan kata sandi Anda.</Text>
          </Item>
          <Item small style={styles.textbox}>
            <TextInput
              keyboardType="email-address"
              label={'Email'}
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
              error={errorEmail}
              value={email}
              returnKeyType="done"
              fontSize={Fonts.size.small}
            />
          </Item>
          <Item center style={{ marginTop: 12 }}>
            <Item plain style={{ width: '100%' }}>
              <Button
                secondary
                uppercase
                fetch
                onPress={checkEmail}
                isFetching={fetching}
                containerStyle={{ height: 40, margin: 0 }}
                textStyle={{ fontSize: 14, margin: 0 }}
              >
                LUPA PASSWORD
              </Button>
            </Item>
          </Item>
          <Item plain style={styles.containerLabel}>
            <Item center row style={{ alignSelf: 'center' }}>
              <Text center>Sudah punya akun?</Text>
              <Text bold center secondary style={{ paddingLeft: 5 }} onPress={() => navigation.pop()}>
                Masuk sekarang
              </Text>
            </Item>
            <Item center row style={{ alignSelf: 'center', marginTop: 20 }} />
          </Item>
        </Item>
        <Modal isVisible={modalSuccess}>
          <Item>
            <Item small>
              <Text>{payload && payload.isSuccess && payload.message}</Text>
            </Item>
            <Item plain center>
              <Button
                secondary
                uppercase
                containerStyle={{ width: 180 }}
                onPress={() => {
                  TimerMixin.setTimeout(() => {
                    setModalSuccess(false)
                  }, 0)
                  TimerMixin.setTimeout(() => {
                    setEmail('')
                    navigation.pop()
                  }, 200)
                }}
              >
                OK
              </Button>
            </Item>
          </Item>
        </Modal>
      </Item>
    </Container>
  )
}

ForgotPassword.navigationOptions = () => ({
  header: null
})

ForgotPassword.propTypes = {
  email: PropTypes.string
}

ForgotPassword.defaultProps = {
  email: ''
}

const styles = StyleSheet.create({
  container: {},
  containerLogo: {
    marginVertical: 24
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
    marginHorizontal: 40
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
  fetching: state.forgotPassword.fetching,
  error: state.forgotPassword.error,
  payload: state.forgotPassword.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ForgotPasswordActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
