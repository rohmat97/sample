import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, View, Platform, Linking, ActivityIndicator, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import BroadcastDashboardActions from '../../Redux/BroadcastDashboardRedux'
import CctvActions from '../../Redux/SearchCctvRedux'
import ReportCctvActions from '../../Redux/ReportCctvRedux'
import UploadGambarChatActions from '../../Redux/UploadGambarChatRedux'
import { Container, Item, Text, RenderIf, RippleTouch, Modal, Button, Icon } from '../../Presentational'
import Video from 'react-native-video'
import { Images } from '../../Themes'
import { WHITE_GREY_03, WHITE, GREY, BLACK } from '../../Themes/Colors'
import { SCREEN_WIDTH } from '../../Themes/Metrics'
import { GiftedChat, Send } from 'react-native-gifted-chat'
import Firestore from '../../Services/Firestore'
import Immutable from 'seamless-immutable'
import { SECTION } from '../../Themes/ApplicationStyles'
import { getFileName } from '../../Transforms/Common'
function CctvChatScreen(props) {
  const {
    navigation,
    broadcastDashboardRequest,
    searchCctvRequest,
    cctv,
    token,
    reportCctvRequest,
    fetching,
    upload,
    uploadGambarChatRequest
  } = props
  const { navigate } = navigation
  const { link, title } = navigation.state.params
  const [showCctv, SetShowCctv] = useState(false)
  const [messages, Setmessage] = useState([])
  const FireStoreListener = new Firestore()
  const [visibleModal, setVisibleModal] = useState(false)
  const [loading, setloading] = useState(true)
  const [image, setimage] = useState('')
  const [dataImage, setdataImage] = useState('')
  const [ambilGambar, setambilGambar] = useState(false)
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

  const onReadyForDisplay = () => {
    SetShowCctv(true)
  }

  const videoError = () => {}

  const sendReport = () => {
    reportCctvRequest({ Cctvid: cctv.content[0].id })
    setVisibleModal(!visibleModal)
  }

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const toggleModalProfile = () => {
    setVisibleModal(!visibleModal)
    navigate('ProfileScreen')
  }

  const check = async () => {
    await searchCctvRequest({ title: title, tenantId: 3 })
    await FireStoreListener.onSnapshotChatsCCTV(cctv.content[0].id, (res) => {
      if (!res) {
        setloading(false)
        FireStoreListener.updateChatsCCTV(cctv.content[0].id, [])
      } else {
        setloading(false)
        convertDate(res)
        Setmessage(res)
      }
    })
  }

  useEffect(() => {
    broadcastDashboardRequest({ tenantId: 3 })
    check()
  }, [])

  useEffect(() => {
    if (upload) {
      setimage(upload.imageUrl)
    }
  }, [upload])

  useEffect(() => {
    if (cctv && messages.length > 0) {
      FireStoreListener.updateChatsCCTV(cctv.content[0].id, messages)
    }
  }, [messages])

  useEffect(() => {
    if (dataImage) {
      const file = new FormData()
      file.append('type', 'cctv')
      file.append('objectId', cctv.content[0].id)
      file.append('images', dataImage)

      uploadGambarChatRequest(file)
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

  if (!cctv) {
    return <ActivityIndicator />
  }
  return (
    <Container loading={loading}>
      <Item plain center height={'40%'} backgroundColor={WHITE_GREY_03}>
        <RenderIf condition={!link || !showCctv}>
          <Item center style={{ marginTop: SCREEN_WIDTH / 10 }}>
            <Image source={Images.ic_cctv_off} style={styles.logo} />
          </Item>
          <Item>
            <Text bold>CCTV tidak dalam mode siaga.</Text>
          </Item>
        </RenderIf>
        <RenderIf condition={link}>
          <Video
            source={{ uri: encodeURI(link) }}
            repeat={true}
            onReadyForDisplay={onReadyForDisplay}
            onError={videoError}
            style={styles.backgroundVideo}
            resizeMode={'stretch'}
          />
        </RenderIf>
      </Item>
      <Item backgroundColor={WHITE} style={styles.shadow}>
        <Item plain row style={{ justifyContent: 'space-between' }}>
          <Item plain style={{ marginRight: 10, width: '15%' }}>
            {cctv.content[0].imageBroadcast ? (
              <Image
                source={{
                  uri: encodeURI(cctv.content[0].imageBroadcast)
                    ? encodeURI(cctv.content[0].imageBroadcast)
                    : Images.dishub
                }}
                style={styles.icon}
              />
            ) : (
              <Image source={Images.dishub} style={styles.icon} />
            )}
          </Item>
          <Item plain style={{ width: '85%' }}>
            <Text white medium bold style={{ paddingTop: 4, color: BLACK }}>
              {cctv.content[0].broadcast ? cctv.content[0].broadcast : 'Disiplin Berlalu Lintas'}
            </Text>
          </Item>
        </Item>
      </Item>
      <Item backgroundColor={WHITE} style={{ width: '100%', height: 50, paddingTop: 5 }}>
        <Item plain row style={{ justifyContent: 'space-between' }}>
          <Item plain style={{ marginLeft: 20, width: '85%' }}>
            <Text style={{ color: GREY }}>
              Jika CCTV bermasalah/mati
              <Text style={{ color: BLACK }}> Tap</Text> Tombol
            </Text>
            <Text style={{ color: GREY }}>Bertanda Seru Berwarna Merah</Text>
          </Item>
          <Item plain style={{ marginTop: 5, paddingRight: 30, width: '15%' }}>
            <RippleTouch onPress={toggleModal}>
              <Item center plain>
                <Image source={Images.ic_cctv_off_report} style={styles.icon} />
              </Item>
            </RippleTouch>
          </Item>
        </Item>
      </Item>
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
                  disableComposer={true}
                />
              </Container>
            )}
          </Container>
        ) : (
          <Container>
            {token ? (
              <Container>
                <GiftedChat
                  textInputStyle={styles.composer}
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
                />
              </Container>
            ) : (
              <Container>
                <GiftedChat
                  messages={messages}
                  disableComposer={true}
                  user={{
                    _id: 0,
                    name: '',
                    avatar: ''
                  }}
                />
              </Container>
            )}
          </Container>
        )}
      </Container>
      <Modal visible={visibleModal} containerStyle={SECTION}>
        <RenderIf condition={token}>
          <Text large>
            Anda akan membuat laporan CCTV bermasalah/mati. Pastikan laporan anda valid. Anda yakin untuk melanjutkan
            laporan ini?
          </Text>
        </RenderIf>
        <RenderIf condition={!token}>
          <Text large>Anda belum login ke aplikasi, anda akan diarahkan ke halaman login</Text>
        </RenderIf>
        <Item row style={{ width: '100%', paddingBottom: 0 }}>
          <Item small style={{ width: '50%', paddingRight: 5 }}>
            <Button emergencyCancle onPress={toggleModal}>
              Batalkan
            </Button>
          </Item>
          <Item small style={{ width: '50%' }}>
            <RenderIf condition={token}>
              <Button fetch onPress={sendReport} isFetching={fetching} emergency>
                Ya, Kirim laporan
              </Button>
            </RenderIf>
            <RenderIf condition={!token}>
              <Button onPress={toggleModalProfile} emergency>
                Ya, Lanjutkan
              </Button>
            </RenderIf>
          </Item>
        </Item>
      </Modal>
      <RenderIf condition={ambilGambar}>
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
      </RenderIf>
    </Container>
  )
}

CctvChatScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <RippleTouch
      onPress={() => {
        const uri =
          'http://maps.google.com/maps?daddr=' +
          navigation.state.params.latitude +
          '+' +
          navigation.state.params.longitude

        const uriIOS =
          'http://maps.google.com/maps?daddr=' +
          navigation.state.params.latitude +
          '+' +
          navigation.state.params.longitude

        Linking.openURL(Platform.OS === 'ios' ? uriIOS : uri)
      }}
    >
      <Item plain row style={{ justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Item plain style={{ width: '79%' }}>
            <Text white medium bold style={{ color: BLACK }}>
              {navigation.state.params.title}
            </Text>
            <Text white medium bold style={styles.text}>
              {navigation.state.params.address}
            </Text>
          </Item>
        </View>
        <Item plain style={{ marginTop: 10, marginRight: 30, width: '17%' }}>
          <Image source={Images.ic_dishub} style={styles.icon} />
        </Item>
      </Item>
    </RippleTouch>
  )
})

const styles = StyleSheet.create({
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
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  text: {
    color: GREY,
    fontSize: 12
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
  broadcastDashboard: state.broadcastDashboard.payload,
  cctv: state.searchCctv.payload,
  token: state.tokenizer.token,
  fetching: state.reportCctv.fetching,
  upload: state.uploadGambar.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(BroadcastDashboardActions, CctvActions, TokenizerActions, ReportCctvActions, UploadGambarChatActions),
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CctvChatScreen)
