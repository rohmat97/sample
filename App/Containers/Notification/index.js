import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../../Themes'
import { Item, Text, Section, Container } from '../../Presentational'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { WHITE_GREY_02 } from '../../Themes/Colors'
import { SCREEN_WIDTH } from '../../Themes/Metrics'

function Notification(props) {
  return (
    <Container style={{ paddingTop: isIphoneX() ? 35 : 0, backgroundColor: WHITE_GREY_02 }}>
      <Section style={{ marginTop: SCREEN_WIDTH / 3 }}>
        <Item center>
          <Image source={Images.emptyNotification} style={styles.logo} />
        </Item>
      </Section>
      <Section>
        <Item center>
          <Text bold>Tidak Ada Notifikasi</Text>
        </Item>
      </Section>
    </Container>
  )
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})

// next feature
// const mapStateToProps = (state) => {
//   return null
// }

// const mapDispatchToProps = (dispatch) => {
//   return null
// }

export default connect(null, null)(Notification)
