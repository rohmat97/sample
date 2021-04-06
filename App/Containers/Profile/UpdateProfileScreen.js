import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Picker } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UpdateProfileActions from '../../Redux/UpdateProfileRedux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { Container, Item, TextInput, Button, Icon, Text, RippleTouch } from '../../Presentational'
import Fonts from '../../Themes/Fonts'
import Icons from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-datepicker'
import Modal from 'react-native-modal'
import { WHITE, RED } from '../../Themes/Colors'

function UpdateProfileScreen(props) {
  const { navigation, token, updateProfileRequest, fetching } = props
  const { navigate } = navigation
  const [fullName, setFullName] = useState('')
  const [errorFullName] = useState()
  const [email, setEmail] = useState('')
  const [errorEmail] = useState()
  const [placeOfBirth, setPlaceOfBirth] = useState('')
  const [errorPlaceOfBirth] = useState()
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errorPhoneNumber] = useState()
  const [gender, setGender] = useState('')
  const [job, setJob] = useState('')
  const [errorJob] = useState()
  const [isSelectedWoman, setIsSelectedWoman] = useState()
  const [isSelectedMan, setIsSelectedMan] = useState()
  const [visibleModalJob, setVisibleModalJob] = useState(false)

  useEffect(() => {
    if (!token) navigate('LoginScreen')
    else {
      setFullName(token.fullName)
      setEmail(token.email)
      setPlaceOfBirth(token.placeOfBirth)
      setDateOfBirth(token.dateOfBirth)
      setPhoneNumber(token.phoneNumber)
      setGender(token.gender)
      setJob(token.job)
    }
  }, [])

  const updateProfile = () => {
    const file = new FormData()
    file.append('fullName', fullName)
    file.append('dateOfBirth', dateOfBirth)
    file.append('phoneNumber', phoneNumber)
    file.append('gender', gender)
    file.append('job', job)
    file.append('placeOfBirth', placeOfBirth)
    file.append('email', email)

    updateProfileRequest(file)
  }

  const IconNav = ({ source }) => {
    const color = 'black'
    const size = 25
    return <Icon name={source} size={size} color={color} style={{ marginTop: 6, marginLeft: 15 }} />
  }

  const onPressGenderWoman = () => {
    setGender('Perempuan')
    setIsSelectedWoman(true)
    setIsSelectedMan(false)
  }

  const onPressGenderMan = () => {
    setGender('Laki-Laki')
    setIsSelectedMan(true)
    setIsSelectedWoman(false)
  }

  const IconRadioWoman = ({ isSelectedWoman, gender }) => {
    const color = 'black'
    const size = 25
    const name = isSelectedWoman || gender === 'Perempuan' ? 'ios-radio-button-on' : 'ios-radio-button-off'
    return (
      <Icons.Button
        name={name}
        size={size}
        color={color}
        height={20}
        padding={5}
        backgroundColor="transparent"
        onPress={() => onPressGenderWoman()}
      />
    )
  }

  const IconRadioMan = ({ isSelectedMan, gender }) => {
    const color = 'black'
    const size = 25
    const name = isSelectedMan || gender === 'Laki-Laki' ? 'ios-radio-button-on' : 'ios-radio-button-off'
    return (
      <Icons.Button
        name={name}
        size={size}
        color={color}
        height={20}
        padding={5}
        backgroundColor="transparent"
        onPress={() => onPressGenderMan()}
      />
    )
  }

  return (
    <Container style={styles.container}>
      <Item row backgroundColor={WHITE} style={styles.shadow}>
        <RippleTouch onPress={() => navigation.pop()}>
          <IconNav source={'arrow-left'} />
        </RippleTouch>
        <Text bold style={styles.title}>
          Edit Profile
        </Text>
        <Button
          uppercase
          onPress={() => updateProfile()}
          fetch
          containerStyle={styles.btnEdit}
          textStyle={styles.btnTextEdit}
          isFetching={fetching}
        >
          SIMPAN
        </Button>
      </Item>
      <Item plain style={styles.containerForm}>
        <Item plain style={styles.textbox}>
          <TextInput
            inputRef={(ref) => (this.fullName = ref)}
            keyboardType="default"
            placeholder={'Masukan nama anda disini'}
            label={'Nama'}
            onChangeText={(fullName) => setFullName(fullName)}
            error={errorFullName}
            value={fullName}
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
            keyboardType="email-address"
            placeholder={'Masukan Email anda disini'}
            label={'Email'}
            onChangeText={(email) => setEmail(email)}
            error={errorEmail}
            value={email}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.email.focus()
            }}
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
          minDate="1958-01-01"
          maxDate="2019-01-01"
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
        <Item plain style={{ marginTop: 15, marginBottom: -10 }}>
          <Text style={{ fontSize: 12 }}>Jenis Kelamin</Text>
          <Item row plain style={{ marginTop: -10 }}>
            <Item row>
              <Item row style={{ marginRight: 30 }}>
                <IconRadioWoman isSelectedWoman={isSelectedWoman} gender={gender} />
                <Text>Perempuan</Text>
              </Item>
              <Item row>
                <IconRadioMan isSelectedMan={isSelectedMan} gender={gender} />
                <Text>Laki-Laki</Text>
              </Item>
            </Item>
          </Item>
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
      </Item>
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
    </Container>
  )
}

UpdateProfileScreen.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerForm: {
    marginHorizontal: 20
  },
  textbox: {
    marginVertical: -2
  },
  btnEdit: {
    backgroundColor: WHITE,
    marginRight: 10,
    marginVertical: -20,
    marginTop: 0
  },
  btnTextEdit: {
    fontSize: 14,
    fontWeight: 'bold',
    color: RED
  },
  shadow: {
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  title: {
    fontWeight: 'bold',
    marginLeft: -75,
    marginVertical: 5,
    fontSize: 20
  }
})

const mapStateToProps = (state) => ({
  updateProfile: state.updateProfile.payload,
  token: state.tokenizer.token,
  success: state.updateProfile.payload,
  error: state.updateProfile.error,
  fetching: state.updateProfile.fetching
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(UpdateProfileActions, TokenizerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen)
