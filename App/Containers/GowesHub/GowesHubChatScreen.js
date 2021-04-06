import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { Container, Item, Text, RenderIf, Modal, Button, Icon } from '../../Presentational'
import { Images } from '../../Themes'
import { GREY } from '../../Themes/Colors'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Firestore from '../../Services/Firestore'
import Immutable from 'seamless-immutable'
import ImagePicker from 'react-native-image-picker'
import UploadGambarAction from '../../Redux/UploadGambarGoweshubRedux'
import { getFileName } from '../../Transforms/Common'
import { SECTION } from '../../Themes/ApplicationStyles'

function GowesHubChatScreen(props) {
  const { token, upload, uploadGambarGoweshubRequest } = props
  const [messages, Setmessage] = useState([])
  const FireStoreListener = new Firestore()
  const [, setloading] = useState(true)
  const [image, setimage] = useState('')
  const [dataImage, setdataImage] = useState()
  const [ambilGambar, setambilGambar] = useState(false)

  const setImage = (imageUri) => {
    setdataImage({
      uri: imageUri,
      static: true,
      type: 'image/jpeg',
      name: getFileName(imageUri)
    })
  }

  const onSend = (message = []) => {
    Setmessage(
      GiftedChat.append(messages, {
        text: message[0].text,
        createdAt: new Date(),
        user: {
          _id: token.id,
          name: token.fullName,
          avatar: token.imageUrl ? token.imageUrl : Images.ic_default_user
        }
        // _id: message[0]._id
      })
    )
  }

  const convertDate = (messages) => {
    messages = Immutable.asMutable(messages, { deep: true })
    messages.map((message) => {
      message['createdAt'] = new Date(message.createdAt.seconds * 1000)
    })
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
    setimage('')
    setdataImage()
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

  const pickAnImageHandler = () => {
    setambilGambar(false)
    const { navigate } = props.navigation
    navigate('TakePhotoScreen', { facing: 'back', borderType: 'none', source: setImage })
  }

  const check = async () => {
    await FireStoreListener.onSnapshotGowesHub('goweshubchat', (res) => {
      if (!res) {
        setloading(false)
        FireStoreListener.updateChatsGowesHub('goweshubchat', [])
      } else {
        setloading(false)
        convertDate(res)
        Setmessage(res)
      }
    })
  }
  useEffect(() => {
    check()
  }, [])

  useEffect(() => {
    if (upload) {
      setimage(upload.imageUrl)
    }
  }, [upload])

  useEffect(() => {
    if (dataImage) {
      const file = new FormData()
      file.append('type', 'cctv')
      file.append('objectId', 0)
      file.append('images', dataImage)

      uploadGambarGoweshubRequest(file)
    }
  }, dataImage)

  useEffect(() => {
    if (image) {
      Setmessage(
        GiftedChat.append(messages, {
          text: '',
          createdAt: new Date(),
          user: {
            _id: token.id,
            name: token.fullName,
            avatar: token.imageUrl ? token.imageUrl : Images.ic_default_user
          },
          image: !image ? upload.imageUrl : image
        })
      )
    }
  }, [upload, image])
  useEffect(() => {
    if (messages.length > 0) {
      FireStoreListener.updateChatsGowesHub('goweshubchat', messages)
    }
  }, [messages])

  return (
    <Container>
      {JSON.stringify(messages) === '[]' ? (
        <Container>
          <Item center>
            <Image source={Images.ic_no_chat} style={styles.logo} />
          </Item>
          <Item>
            <Text center bold>
              Saat ini belum ada chat yang masuk.
            </Text>
          </Item>
          {token ? (
            <Container>
              <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                  _id: token.id,
                  name: token.fullName,
                  avatar: token.imageUrl
                }}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
              />
            </Container>
          ) : (
            <Container>
              <GiftedChat
                messages={messages}
                user={{
                  _id: 0,
                  name: '',
                  avatar: ''
                }}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
              />
            </Container>
          )}
        </Container>
      ) : (
        <Container>
          {token ? (
            <Container>
              <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                renderSend={(props) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', height: 60 }}>
                    <TouchableOpacity style={styles.fab} onPress={() => showPicker()}>
                      <Image source={Images.addPhoto} style={styles.icon} />
                    </TouchableOpacity>
                    <Send {...props}>
                      <View style={styles.btnSend}>
                        <Icon name="send" size={24} color="#ffffff" />
                      </View>
                    </Send>
                  </View>
                )}
                user={{
                  _id: token.id,
                  name: token.fullName,
                  avatar: token.imageUrl
                }}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
              />
            </Container>
          ) : (
            <Container>
              <GiftedChat
                messages={messages}
                user={{
                  _id: 0,
                  name: '',
                  avatar: ''
                }}
                renderUsernameOnMessage={true}
                showUserAvatar={true}
              />
            </Container>
          )}
        </Container>
      )}
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

GowesHubChatScreen.navigationOptions = () => ({
  title: 'Chat Gowes HUB'
})

const styles = StyleSheet.create({
  logo: {
    marginTop: '50%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: '100%',
    height: 40,
    paddingTop: 4
  },
  backgroundVideo: {
    width: '100%',
    height: '100%'
  },
  icon: {
    height: 33,
    width: 33,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  iconCctv: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  fab: {
    height: 45,
    width: 45,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  composer: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    fontSize: 16
  },
  btnSend: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GREY,
    marginRight: 10,
    borderRadius: 50
  }
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  upload: state.uploadGowes.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, UploadGambarAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GowesHubChatScreen)
