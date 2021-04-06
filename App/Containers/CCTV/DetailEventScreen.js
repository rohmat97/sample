import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Item, Container, Text, Icon } from '../../Presentational'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { GREY } from '../../Themes/Colors'
import { switchSmallIcon, HeaderPost, DescriptionPost } from './Component'
import Share from 'react-native-share'
import { Base64 } from 'js-base64'

const IconNav = ({ source }) => {
  const color = 'grey'
  const size = 25
  return <Icon name={source} size={size} color={color} />
}

function DetailEventScreen(props) {
  const { navigation } = props
  const { navigate } = navigation
  const { headline, address, imagePost, description, userName, userImage, id } = navigation.state.params
  const [eventIcon, setEventIcon] = useState()
  const [hashId] = useState('https://indohub.app.link/event-report?Id=')

  const moveToCommentsDetailEvent = (description, userName, userImage, id, isMove) => {
    if (!isMove)
      navigate('CommentsDetailEventScreen', {
        description: description,
        userName: userName,
        userImage: userImage,
        id: id
      })
  }

  useEffect(() => {
    setEventIcon(switchSmallIcon(headline))
  }, [])

  const shareOptions = {
    title: 'Share via',
    message: 'Klik link dibawah ini\n' + hashId + Base64.encode(id)
  }

  const shareLink = () => {
    Share.open(shareOptions)
  }

  return (
    <Container>
      {/* <ScrollView> */}
      <Item plain style={styles.container}>
        <HeaderPost headline={headline} address={address} eventIcon={eventIcon} shareLink={shareLink} />
        <Item style={{ height: '50%', marginTop: -5 }}>
          <Image source={{ uri: imagePost }} style={styles.logo} />
        </Item>
        <DescriptionPost userName={userName} userImage={userImage} description={description} />
        <TouchableOpacity
          onPress={() => {
            moveToCommentsDetailEvent(description, userName, userImage, id)
          }}
          style={{ marginLeft: 10, width: SCREEN_WIDTH / 3 }}
        >
          <Item row style={{ marginTop: -10 }}>
            <IconNav source={'comment'} />
            <Item style={{ marginTop: -7, marginLeft: 5 }}>
              <Text style={{ color: GREY }}>komentar</Text>
            </Item>
          </Item>
        </TouchableOpacity>
      </Item>
      {/* </ScrollView> */}
    </Container>
  )
}

DetailEventScreen.navigationOptions = ({ navigation }) => ({
  title: 'Event'
})

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT / 2,
    flex: 1,
    justifyContent: 'flex-start'
  },
  logo: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    marginStart: 0
  }
})

export default connect(null, null)(DetailEventScreen)
