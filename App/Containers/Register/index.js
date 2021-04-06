import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Image, Picker, Keyboard, ScrollView } from 'react-native'
import { TextInput, Container, Item, Text, PasswordEye, Button, RenderIf } from '../../Presentational'
import { validateEmail, validateHandphone } from '../../Services/Common'
import { SECTION, DOUBLE_BASE_MARGIN } from '../../Themes/Metrics'
import RegisterActions from '../../Redux/RegisterRedux'
import { GREY, WHITE, RED } from '../../Themes/Colors'
import Images from '../../Themes/Images'
import Fonts from '../../Themes/Fonts'
import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Register(props) {
  const { navigation, fetching, registerRequest, errorMessages } = props
  const [name, setName] = useState('')
  const [errorName, setErrorName] = useState()
  const [gender, setGender] = useState('')
  const [errorGender, setErrorGender] = useState()
  const [job, setJob] = useState('')
  const [errorJob, setErrorJob] = useState()
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState()
  const [number, setNumber] = useState('')
  const [errorNumber, setErrorNumber] = useState()
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState()
  const [rePassword, setRePassword] = useState('')
  const [errorRePassword, setErrorRePassword] = useState()
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [reSecureTextEntry, setReSecureTextEntry] = useState(true)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalJob, setVisibleModalJob] = useState(false)
  const [alreadyRegister] = useState(false)

  const renderPasswordAccessory = (flag) => {
    return <PasswordEye onPress={onAccessoryPress} flag={flag} />
  }
  const onAccessoryPress = () => {
    setSecureTextEntry(!secureTextEntry)
  }

  const renderRePasswordAccessory = (flag) => {
    return <PasswordEye onPress={onReAccessoryPress} flag={flag} />
  }
  const onReAccessoryPress = () => {
    setReSecureTextEntry(!reSecureTextEntry)
  }

  useEffect(() => {
    if (errorMessages) {
      errorMessages.map((data) => {
        switch (data.members[0]) {
          case 'name':
            setErrorName(data.message)
            break
          case 'gender':
            setErrorGender(data.message)
            break
          case 'job':
            setErrorJob(data.message)
            break
          case 'email':
            setErrorEmail(data.message)
            break
          case 'number':
            setErrorNumber(data.message)
            break
          case 'password':
            setErrorPassword(data.message)
            break
          case 'rePassword':
            setErrorRePassword(data.message)
            break
        }
      })
    }
  }, [errorMessages])

  useEffect(() => {
    if (name && !errorName && email && !errorEmail && password && !errorPassword && rePassword && !errorRePassword) {
      clearError()
      if (!fetching) registerRequest({ fullname: name, gender, email, phonenumber: number, password, job })
    }
  }, [errorName, errorGender, errorJob, errorEmail, errorNumber, errorPassword, errorRePassword])

  const onSubmitPressed = () => {
    setErrorName(validation(true, 'name', name)) ||
      setErrorGender(validation(false, 'gender', gender)) ||
      setErrorJob(validation(false, 'job', job)) ||
      setErrorEmail(validation(true, 'email', email)) ||
      setErrorNumber(validation(false, 'number', number)) ||
      setErrorPassword(validation(true, 'password', password)) ||
      setErrorRePassword(validation(true, 'rePassword', rePassword, password))
  }

  const clearError = () => {
    setErrorName()
    setErrorGender()
    setErrorJob()
    setErrorEmail()
    setErrorNumber()
    setErrorPassword()
    setErrorRePassword()
  }

  const validation = (isMandatory, type, value, secondValue) => {
    if (isMandatory && !value) return 'Harus diisi'
    else {
      switch (type) {
        case 'name':
          return value.length < 2 || value.length > 50 ? 'Nama harus lebih dari 2 dan kurang dari 50' : null
        case 'gender':
        case 'job':
          return null
        case 'email':
          return !validateEmail(value) ? 'Email tidak valid' : null
        case 'number':
          return !validateHandphone(value) ? 'Nomor handphone tidak valid' : null
        case 'password':
          return value.length < 6 || value.length > 25 ? 'Nama harus lebih dari 6 dan kurang dari 25' : null
        case 'rePassword':
          return value !== secondValue ? 'Kata sandi tidak sama' : null
      }
    }
  }

  return (
    <Container>
      <ScrollView>
        <Item plain style={styles.container}>
          <Item plain style={styles.containerLogo}>
            <Image source={Images.illustration_register} style={styles.logo} />
          </Item>
          <Item plain style={styles.containerForm}>
            <Item small style={styles.textbox}>
              <TextInput
                label={'* Nama'}
                autoCapitalize="none"
                onChangeText={(name) => setName(name)}
                error={errorName}
                value={name}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.gender.focus()
                }}
                fontSize={Fonts.size.small}
              />
            </Item>
            <Item small style={styles.textbox}>
              <TouchableOpacity onPress={() => setVisibleModal(true)}>
                <TextInput
                  disabled={true}
                  inputRef={(ref) => (this.gender = ref)}
                  label={'Jenis Kelamin'}
                  autoCapitalize="none"
                  error={errorGender}
                  value={gender}
                  returnKeyType="next"
                  fontSize={Fonts.size.small}
                />
              </TouchableOpacity>
            </Item>
            <Item small style={styles.textbox}>
              <TouchableOpacity onPress={() => setVisibleModalJob(true)}>
                <TextInput
                  disabled={true}
                  inputRef={(ref) => (this.job = ref)}
                  label={'Pekerjaan'}
                  autoCapitalize="none"
                  error={errorJob}
                  value={job}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.email.focus()
                  }}
                  fontSize={Fonts.size.small}
                />
              </TouchableOpacity>
            </Item>
            <Item small style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.number = ref)}
                keyboardType="phone-pad"
                label={'Nomor Handphone'}
                autoCapitalize="none"
                onChangeText={(number) => setNumber(number)}
                error={errorNumber}
                value={number}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.email.focus()
                }}
                fontSize={Fonts.size.small}
              />
            </Item>
            <Item small style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.email = ref)}
                keyboardType="email-address"
                label={'* Email'}
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
            <Item small style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.password = ref)}
                secureTextEntry={secureTextEntry}
                label={'* Kata Sandi'}
                autoCapitalize="none"
                onChangeText={(password) => setPassword(password)}
                error={errorPassword}
                value={password}
                renderAccessory={() => renderPasswordAccessory(secureTextEntry)}
                fontSize={Fonts.size.small}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.rePassword.focus()
                }}
                blurOnSubmit={false}
              />
            </Item>
            <Item small style={styles.textbox}>
              <TextInput
                inputRef={(ref) => (this.rePassword = ref)}
                secureTextEntry={reSecureTextEntry}
                label={'* Ulangi Kata Sandi'}
                autoCapitalize="none"
                onChangeText={(rePassword) => setRePassword(rePassword)}
                error={errorRePassword}
                value={rePassword}
                renderAccessory={() => renderRePasswordAccessory(reSecureTextEntry)}
                fontSize={Fonts.size.small}
                returnKeyType="done"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
              />
            </Item>
            <RenderIf condition={alreadyRegister}>
              <Item style={styles.textbox}>
                <Item />
                <Text style={{ color: RED }}>Email sudah terdaftar.</Text>
              </Item>
            </RenderIf>
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
                  DAFTAR
                </Button>
              </Item>
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
          <Modal isVisible={visibleModal}>
            <Item style={{ borderRadius: 16 }} backgroundColor={WHITE}>
              <Item small style={{ paddingHorizontal: 18, marginBottom: -28 }}>
                <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
                  <Picker.Item label="Laki-laki" value="Laki-laki" />
                  <Picker.Item label="Perempuan" value="Perempuan" />
                </Picker>
              </Item>
              <Item style={{ marginTop: 20, alignSelf: 'center' }}>
                <Button
                  secondary
                  uppercase
                  containerStyle={{ width: 180 }}
                  onPress={() => {
                    if (gender === '') {
                      setVisibleModal(false)
                      setGender('Laki-laki')
                    } else setVisibleModal(false)
                  }}
                >
                  OK
                </Button>
              </Item>
            </Item>
          </Modal>
          <Modal isVisible={visibleModalJob}>
            <Item style={{ borderRadius: 16 }} backgroundColor={WHITE}>
              <Item small style={{ paddingHorizontal: 18, marginBottom: -28 }}>
                <Picker selectedValue={job} onValueChange={(itemValue) => setJob(itemValue)}>
                  <Picker.Item label="Wirausaha" value="Wirausaha" />
                  <Picker.Item label="Karyawan Swasta" value="Karyawan Swasta" />
                  <Picker.Item label="Pegawai Negeri" value="Pegawai Negeri" />
                  <Picker.Item label="Pelajar" value="Pelajar" />
                  <Picker.Item label="Tidak bekerja" value="Tidak bekerja" />
                </Picker>
              </Item>
              <Item style={{ marginTop: 20, alignSelf: 'center' }}>
                <Button
                  secondary
                  uppercase
                  containerStyle={{ width: 180 }}
                  onPress={() => {
                    if (!job) {
                      setVisibleModalJob(false)
                      setJob('Wirausaha')
                    } else setVisibleModalJob(false)
                  }}
                >
                  OK
                </Button>
              </Item>
            </Item>
          </Modal>
        </Item>
      </ScrollView>
    </Container>
  )
}

Register.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerLogo: {
    marginTop: 24
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
  fetching: state.register.fetching,
  error: state.register.error,
  errorMessages: state.register.errorMessages,
  registerPayload: state.register.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(RegisterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
