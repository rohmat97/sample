import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import UpdateProfileImageActions from '../../Redux/UpdateProfileImageRedux'
import { Container, Item, Text, RenderIf, Modal, Button, Icon } from '../../Presentational'
import { UserProfile, UserImageAndNameMyProfile } from './Component'
import { RED, WHITE } from '../../Themes/Colors'
import ImagePicker from 'react-native-image-picker'
import { getFileName } from '../../Transforms/Common'
import { SECTION } from '../../Themes/ApplicationStyles'
import { SCREEN_WIDTH } from '../../Themes/Metrics'

function MyProfile(props) {
  const { token, navigation, profilePayload, profileRequest, updateProfileImageRequest, fetching } = props
  const { navigate } = navigation
  const [profile, setProfile] = useState([])
  const [photo, setPhoto] = useState(null)
  const [ambilGambar, setambilGambar] = useState(false)
  const [loading, setLoading] = useState(true)

  const pickAnImageHandler = () => {
    setambilGambar(false)
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

  const updateProfileImage = () => {
    if (photo) {
      updateProfileImageRequest({ images: photo })
    }
  }

  const options = {
    title: 'Select Picture',
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }

  const showPicker = () => {
    setambilGambar(true)
    setPhoto()
  }

  const pickImageGallery = () => {
    setambilGambar(false)
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!
      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton)
      } else {
        setImage(response.uri)
      }
    })
  }

  const removePhoto = () => {
    setPhoto(null)
  }

  const IconNav = ({ source }) => {
    const color = 'black'
    const size = 25
    return <Icon name={source} size={size} color={color} style={{ marginTop: 6, marginLeft: 15 }} />
  }

  useEffect(() => {
    if (!token) navigate('LoginScreen')
  }, [])

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

  return (
    <Container loading={loading}>
      <RenderIf condition={!photo}>
        <Item row backgroundColor={WHITE} style={styles.shadow}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <IconNav source={'arrow-left'} />
          </TouchableOpacity>
          <Text bold style={styles.title}>
            Data Diri
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('UpdateProfileScreen')} style={styles.btnEdit}>
            <Text style={styles.textButton}>EDIT</Text>
          </TouchableOpacity>
        </Item>
      </RenderIf>
      <RenderIf condition={photo}>
        <Item row backgroundColor={WHITE} style={styles.shadow}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <IconNav source={'arrow-left'} />
          </TouchableOpacity>
          <Text bold style={styles.title2}>
            Data Diri
          </Text>
        </Item>
      </RenderIf>
      <Item plain>
        <UserImageAndNameMyProfile
          src={photo}
          profile={profile}
          showPicker={showPicker}
          removePhoto={removePhoto}
          saveImage={updateProfileImage}
          fetching={fetching}
        />
        <UserProfile profile={profile} />
      </Item>
      <Modal visible={ambilGambar} containerStyle={(SECTION, { borderRadius: 16, marginRight: -10 })}>
        <RenderIf condition={token}>
          <Text large>Select a Picture</Text>
        </RenderIf>
        <Item small style={{ width: '100%', paddingTop: 16 }}>
          <Button reverse onPress={() => pickAnImageHandler()}>
            Select From Camera
          </Button>
        </Item>
        <Item small style={{ width: '100%', marginTop: -16 }}>
          <Button onPress={() => pickImageGallery()} secondary>
            Select From Library
          </Button>
        </Item>
        <Item small style={{ width: '100%', marginTop: -16 }}>
          <Button onPress={() => setambilGambar(false)} red>
            Cancel
          </Button>
        </Item>
      </Modal>
    </Container>
  )
}

MyProfile.navigationOptions = () => ({
  header: null
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  profilePayload: state.profile.payload,
  UpdateProfileImagePayload: state.updateProfileImage.payload,
  fetching: state.updateProfileImage.fetching
})

const styles = StyleSheet.create({
  textButton: {
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
    marginLeft: -150,
    marginVertical: 5,
    fontSize: 20
  },
  title2: {
    fontWeight: 'bold',
    marginRight: SCREEN_WIDTH / 1.7,
    marginVertical: 5,
    fontSize: 20
  },
  btnEdit: {
    marginRight: 20,
    marginTop: 10
  }
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, ProfileActions, UpdateProfileImageActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
