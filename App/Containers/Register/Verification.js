import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { TextInput, Container, Item, Text, Modal, Button } from '../../Presentational'
import { SECTION, DOUBLE_BASE_MARGIN } from '../../Themes/Metrics'
import VerificationActions from '../../Redux/VerificationRedux'
import ResendVerificationActions from '../../Redux/ResendVerificationRedux'
import { GREY, WHITE } from '../../Themes/Colors'
import Images from '../../Themes/Images'
import Fonts from '../../Themes/Fonts'

function Verification(props) {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [visibleModal, setVisibleModal] = useState(false)
  const [errorCode, setErrorCode] = useState()
  const { fetching, verificationRequest, resendVerificationRequest, payload, email, resend } = props
  useEffect(() => {
    if (payload) {
      setMessage(payload)
    }
  }, [payload])

  useEffect(() => {
    if (resend) {
      setMessage(resend)
      setVisibleModal(true)
    }
  }, [resend])

  useEffect(() => {
    if (code && !errorCode) {
      setErrorCode()
      if (!fetching) {
        verificationRequest({ code })
      }
    }
  }, [errorCode, code])

  const onSubmitPressed = () => {
    if (!code) setErrorCode('Harus diisi')
    else setErrorCode(null)
  }

  return (
    <Container>
      <Item plain style={styles.container}>
        <Item plain style={styles.containerLogo}>
          <Image source={Images.illustration_register} style={styles.logo} />
        </Item>
        <Item plain style={styles.containerForm}>
          <Item small>
            <Text bold>Aktifkan Akun Anda</Text>
            <Text>Aktifkan Akun Anda dengan memasukan kode verifikasi yang telah dikirimkan ke alamat email Anda.</Text>
          </Item>
          <Item plain style={styles.textbox}>
            <TextInput
              label={'Kode Verifikasi'}
              autoCapitalize="none"
              onChangeText={(code) => setCode(code)}
              error={errorCode}
              value={code}
              returnKeyType="done"
              fontSize={Fonts.size.small}
            />
          </Item>

          <TouchableOpacity onPress={() => resendVerificationRequest({ Email: email })}>
            <Item plain style={styles.forgotText}>
              <Text bold center secondary style={{ paddingLeft: 5 }}>
                Kirim ulang verifikasi
              </Text>
            </Item>
          </TouchableOpacity>
          <Item center style={{ marginTop: 12 }}>
            <Item plain style={{ width: '100%' }}>
              <Button
                secondary
                uppercase
                fetch
                onPress={() => onSubmitPressed()}
                isFetching={fetching}
                containerStyle={{ height: 40, margin: 0 }}
                textStyle={{ fontSize: 14, margin: 0 }}
              >
                VERIFIKASI
              </Button>
            </Item>
          </Item>
        </Item>
      </Item>
      <Modal isVisible={visibleModal}>
        <Item backgroundColor={WHITE}>
          <Item style={{ paddingHorizontal: 18 }}>
            <Item small>
              <Text bold>Kirim Ulang Verifikasi</Text>
            </Item>
            <Text>
              {message}
              <Text bold> {`( ${email} )`}</Text>
            </Text>
          </Item>
          <Item plain center>
            <Button secondary uppercase containerStyle={{ width: 180 }} onPress={() => setVisibleModal(false)}>
              OK
            </Button>
          </Item>
        </Item>
      </Modal>
    </Container>
  )
}

Verification.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  container: {},
  containerLogo: {
    marginTop: 24,
    marginBottom: 12
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
  fetching: state.verification.fetching,
  error: state.verification.error,
  token: state.tokenizer.token,
  email: state.tokenizer.email,
  payload: state.verification.payload,
  resend: state.resendVerification.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(VerificationActions, ResendVerificationActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification)
