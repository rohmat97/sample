import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet } from 'react-native'
import { Container, Item, Separator, Section, Text, Icon, RenderIf } from '../../Presentational'
import { SCREEN_HEIGHT } from '../../Themes/Metrics'
import AboutDinasActions from '../../Redux/AboutDinasRedux'
import { WHITE_GREY_01 } from '../../Themes/Colors'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { RenderDetailDinas } from './Component'

function AboutDinas(props) {
  const { aboutDinasRequest, aboutDinasPayload, navigation } = props
  const { getParam } = navigation
  const [dataDinas, setDataDinas] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    aboutDinasRequest({ id: getParam('id') })
  }, [])

  useEffect(() => {
    if (aboutDinasPayload && aboutDinasPayload.content) {
      setDataDinas(aboutDinasPayload.content)
      setLoading(false)
    }
  }, [aboutDinasPayload])

  return (
    <Container loading={loading}>
      <Item plain style={styles.containerItem}>
        <RenderDetailDinas dataDinas={dataDinas} />
        <Section>
          <Separator light />
        </Section>
        <Section>
          <Item>
            <Text>{dataDinas && dataDinas.description}</Text>
          </Item>
        </Section>
        <RenderIf condition={dataDinas && dataDinas.instagram}>
          <Section>
            <Item row>
              <Icon name={'instagram'} size={20} style={{ marginRight: 8 }} />
              <Text>{dataDinas && dataDinas.instagram}</Text>
            </Item>
          </Section>
        </RenderIf>
      </Item>
    </Container>
  )
}

AboutDinas.navigationOptions = ({ navigation }) => ({
  title: 'Tentang Kami'
})

const styles = StyleSheet.create({
  container: {},
  containerLogo: {
    marginTop: 24,
    marginBottom: SCREEN_HEIGHT / 6
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  containerItem: {
    paddingTop: isIphoneX() ? 32 : 0
    // backgroundColor: DARK_BLUE
  },
  menuContainer: {
    borderColor: WHITE_GREY_01,
    borderWidth: 3,
    borderRadius: 12,
    padding: 8,
    margin: 8,
    width: 104,
    height: 104
  },
  iconMenu: {
    height: 52,
    width: 52
  },
  iconDinas: {
    height: 40,
    width: 40
  }
})

const mapStateToProps = (state) => ({
  aboutDinasPayload: state.aboutDinas.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AboutDinasActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutDinas)
