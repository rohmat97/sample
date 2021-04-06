import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import SlackMessage from './ComponentComment/SlackMessage'
import Firestore from '../../Services/Firestore'
import { Image, StyleSheet, Platform } from 'react-native'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { Images } from '../../Themes'
import { connect } from 'react-redux'
import { Item, Container, Text } from '../../Presentational'
import images from '../../Themes/Images'
import Immutable from 'seamless-immutable'
import { DescriptionPost } from './Component'

class CommentEmergencyReportScreen extends React.Component {
  state = {
    messages: [],
    loading: true,
    action: false
  }

  componentDidMount() {
    this.check()
  }

  componentDidUpdate() {
    const FireStoreListener = new Firestore()
    const { id } = this.props.navigation.state.params
    if (this.state.action === true) {
      FireStoreListener.updateChatsComment(id, this.state.messages)
      this.setState({ action: false })
    }
  }
  convertDate = (messages) => {
    messages = Immutable.asMutable(messages, { deep: true })
    messages.map((message) => {
      message['createdAt'] = message.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' })
    })
  }

  check = async () => {
    const FireStoreListener = new Firestore()
    const { id } = this.props.navigation.state.params
    await FireStoreListener.onSnapshotChatsComment(id, (res) => {
      if (!res) {
        this.setState({ loading: false })
        FireStoreListener.updateChatsComment(id, [])
      } else {
        this.setState({ loading: false })
        this.setState({ messages: res })
        this.convertDate(res)
      }
    })
  }

  onSend(message = []) {
    const { token } = this.props
    this.setState({ action: true })
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, {
        text: message[0].text,
        createdAt: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
        user: {
          _id: token.id,
          name: token.fullName,
          avatar: token.imageUrl ? token.imageUrl : images.ic_default_user
        },
        _id: message[0]._id
      })
    }))
  }

  renderMessage(props) {
    const {
      currentMessage: { text: currText }
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    if (currText) {
      messageTextStyle = {
        fontSize: 14,
        // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
        lineHeight: Platform.OS === 'android' ? 34 : 30
      }
    }

    return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
  }

  render() {
    const { token } = this.props
    const { description, userName, userImage } = this.props.navigation.state.params
    return (
      <Container loading={this.loading} style={{ marginTop: 15 }}>
        <DescriptionPost userName={userName} userImage={userImage} description={description} />
        <Container>
          {JSON.stringify(this.messages) === '[]' ? (
            <Container>
              <Item center>
                <Image source={Images.ic_no_chat} style={styles.logo} />
              </Item>
              <Item>
                <Text center bold>
                  Saat ini belum ada komentar yang masuk.
                </Text>
              </Item>
              {token ? (
                <Container>
                  <GiftedChat
                    inverted={false}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderMessage={this.renderMessage}
                  />
                </Container>
              ) : (
                <Container>
                  <GiftedChat
                    inverted={false}
                    messages={this.state.messages}
                    renderMessage={this.renderMessage}
                    user={{
                      _id: 0,
                      name: '',
                      avatar: ''
                    }}
                  />
                </Container>
              )}
            </Container>
          ) : (
            <Container>
              {token ? (
                <Container>
                  <GiftedChat
                    inverted={false}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderMessage={this.renderMessage}
                  />
                </Container>
              ) : (
                <Container>
                  <GiftedChat
                    inverted={false}
                    messages={this.state.messages}
                    renderMessage={this.renderMessage}
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
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

CommentEmergencyReportScreen.navigationOptions = ({ navigation }) => ({
  title: 'Komentar'
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEmergencyReportScreen)
