/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChangePasswordActions from '../../Redux/ChangePasswordRedux'
import { TextInput, Container, Item, PasswordEye, Button, Footer } from '../../Presentational'
import Fonts from '../../Themes/Fonts'
import PropTypes from 'prop-types'
import { RED } from '../../Themes/Colors'

function ChangePassword(props) {
  const { fetching, changePasswordRequest } = props
  const [oldPassword, setOldPassword] = useState('')
  const [errorOldPassword, setErrorOldPassword] = useState()
  const [currentPassword, setCurrentPassword] = useState('')
  const [errorCurrentPassword, setErrorCurrentPassword] = useState()
  const [confirmCurrentPassword, setConfirmCurrentPassword] = useState('')
  const [errorConfirmCurrentPassword, setErrorConfirmCurrentPassword] = useState()
  const [secureTextEntryOldPass, setSecureTextEntryOldPass] = useState(true)
  const [secureTextEntryNewPass, setsecureTextEntryNewPass] = useState(true)
  const [secureTextEntryReNewPass, setsecureTextEntryReNewPass] = useState(true)

  useEffect(() => {
    if (
      oldPassword &&
      !errorOldPassword &&
      currentPassword &&
      !errorCurrentPassword &&
      confirmCurrentPassword &&
      !errorConfirmCurrentPassword
    ) {
      setErrorOldPassword()
      setErrorCurrentPassword()
      setErrorConfirmCurrentPassword()
      changePasswordRequest({ oldPassword, currentPassword, confirmCurrentPassword })
    }
  }, [errorOldPassword, errorCurrentPassword, errorConfirmCurrentPassword])

  const renderOldPasswordAccessory = (flag) => {
    return <PasswordEye onPress={onAccessoryPressOldPass} flag={flag} />
  }
  const onAccessoryPressOldPass = () => {
    setSecureTextEntryOldPass(!secureTextEntryOldPass)
  }

  const renderNewPasswordAccessory = (flag) => {
    return <PasswordEye onPress={onAccessoryPressNewPass} flag={flag} />
  }
  const onAccessoryPressNewPass = () => {
    setsecureTextEntryNewPass(!secureTextEntryNewPass)
  }

  const renderReNewPasswordAccessory = (flag) => {
    return <PasswordEye onPress={onAccessoryPressReNewPass} flag={flag} />
  }
  const onAccessoryPressReNewPass = () => {
    setsecureTextEntryReNewPass(!secureTextEntryReNewPass)
  }

  const onSubmitPressed = () => {
    checkOldPassword() || checkCurrentPassword() || checkConfirmCurrentPassword()
  }

  const checkOldPassword = () => {
    if (!oldPassword) setErrorOldPassword('Harus diisi')
    else setErrorOldPassword(null)
  }
  const checkCurrentPassword = () => {
    if (!currentPassword) setErrorCurrentPassword('Harus diisi')
    else setErrorCurrentPassword(null)
  }
  const checkConfirmCurrentPassword = () => {
    if (!confirmCurrentPassword) setErrorConfirmCurrentPassword('Harus diisi')
    else setErrorConfirmCurrentPassword(null)
  }

  return (
    <Container>
      <Item plain style={styles.container}>
        <Item plain style={styles.containerForm}>
          <Item plain style={styles.textbox}>
            <TextInput
              secureTextEntry={secureTextEntryOldPass}
              inputRef={(ref) => (this.odlPassword = ref)}
              label={'Kata Sandi Lama'}
              autoCapitalize="none"
              onChangeText={(oldPassword) => setOldPassword(oldPassword)}
              error={errorOldPassword}
              value={oldPassword}
              renderAccessory={() => renderOldPasswordAccessory(secureTextEntryOldPass)}
              fontSize={Fonts.size.small}
              returnKeyType="done"
            />
          </Item>
          <Item plain style={styles.textbox}>
            <TextInput
              secureTextEntry={secureTextEntryNewPass}
              inputRef={(ref) => (this.currentPassword = ref)}
              label={'Kata Sandi Baru'}
              autoCapitalize="none"
              onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
              error={errorCurrentPassword}
              value={currentPassword}
              renderAccessory={() => renderNewPasswordAccessory(secureTextEntryNewPass)}
              fontSize={Fonts.size.small}
              returnKeyType="done"
            />
          </Item>
          <Item plain style={styles.textbox}>
            <TextInput
              secureTextEntry={secureTextEntryReNewPass}
              inputRef={(ref) => (this.confirmCurrentPassword = ref)}
              label={'Konfirmasi Kata Sandi Baru'}
              autoCapitalize="none"
              onChangeText={(confirmCurrentPassword) => setConfirmCurrentPassword(confirmCurrentPassword)}
              error={errorConfirmCurrentPassword}
              value={confirmCurrentPassword}
              renderAccessory={() => renderReNewPasswordAccessory(secureTextEntryReNewPass)}
              fontSize={Fonts.size.small}
              returnKeyType="done"
            />
          </Item>
        </Item>
        <Footer borderWidth={0} backgroundColor={'transparent'}>
          <Button
            secondary
            uppercase
            fetch
            onPress={onSubmitPressed}
            isFetching={fetching}
            containerStyle={{ height: 40, backgroundColor: RED }}
            textStyle={{ fontSize: 14, margin: 0 }}
          >
            Ubah Kata Sandi
          </Button>
        </Footer>
      </Item>
    </Container>
  )
}

ChangePassword.navigationOptions = () => ({
  title: 'Ubah Kata Sandi'
})

ChangePassword.propTypes = {
  password: PropTypes.string,
  secureTextEntry: PropTypes.bool
}

ChangePassword.defaultProps = {
  password: '',
  secureTextEntry: true
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerForm: {
    marginHorizontal: 20,
    marginTop: 20
  },
  textbox: {
    marginVertical: -7
  }
})

const mapStateToProps = (state) => ({
  fetching: state.changePassword.fetching,
  error: state.changePassword.error,
  data: state.changePassword.payload,
  success: state.changePassword.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ChangePasswordActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
