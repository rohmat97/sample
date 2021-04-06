import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Item, Container, Text, Icon } from '../../Presentational'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'

import { GREY } from '../../Themes/Colors'
import { switchSmallIcon, HeaderPost, DescriptionPost } from './Component'

const IconNav = ({ source }) => {
  const color = 'grey'
  const size = 25
  return <Icon name={source} size={size} color={color} />
}
function DetailEmergencyScreen(props) {
  const { navigation } = props
  const { headline, address, imagePost, description, userName, userImage, id } = navigation.state.params
  const [emergencyIcon, setEmergencyIcon] = useState()

  const moveToCommentsDetailEmergency = (description, userName, userImage, id, isMove) => {
    if (!isMove)
      navigation.navigate('CommentEmergencyReportScreen', {
        description: description,
        userName: userName,
        userImage: userImage,
        id: id
      })
  }
  useEffect(() => {
    setEmergencyIcon(switchSmallIcon(headline))
  }, [])

  return (
    <Container>
      {/* <ScrollView> */}
      <Item plain style={styles.container}>
        <HeaderPost headline={headline} address={address} eventIcon={emergencyIcon} />
        <Item style={{ height: '50%' }}>
          <Image source={{ uri: imagePost }} style={styles.logo} />
        </Item>
        <DescriptionPost userName={userName} userImage={userImage} description={description} />
        <TouchableOpacity
          onPress={() => {
            moveToCommentsDetailEmergency(description, userName, userImage, id)
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

DetailEmergencyScreen.navigationOptions = ({ navigation }) => ({
  title: 'Emergency'
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
  },
  logoKomen: {
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

export default connect(null, null)(DetailEmergencyScreen)
