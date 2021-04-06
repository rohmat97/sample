import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { Container, Item, Text, Separator, RippleTouch, RenderIf } from '../../Presentational'
import { SCREEN_HEIGHT } from '../../Themes/Metrics'
import GetDetailDinasActions from '../../Redux/GetDetailDinasRedux'
import Images from '../../Themes/Images'
import Slider from '../../Presentational/Introduction/Slider'
import { WHITE_GREY_01 } from '../../Themes/Colors'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { RenderDetailDinas } from './Component'
import TimerMixin from 'react-timer-mixin'

function DetailMenu(props) {
  const { getDetailDinasRequest, getDetailDinasPayload, navigation } = props
  const { getParam, navigate } = navigation
  const [dataBanner, setDataBanner] = useState([])
  const [menu] = useState([
    {
      index: 1,
      name: 'Tentang Kami',
      imageUrl: Images.ic_about_us
    }
  ])
  const [dataDinas, setDataDinas] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDetailDinasRequest({ id: getParam('id') })
  }, [])

  useEffect(() => {
    TimerMixin.setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [dataDinas])

  useEffect(() => {
    if (getDetailDinasPayload && getDetailDinasPayload.content) {
      setDataDinas(getDetailDinasPayload.content)
      setDataBanner(getDetailDinasPayload.content.imageSlider)
    }
  }, [getDetailDinasPayload])

  const RenderItem = () => {
    return (
      <View>
        <Item plain style={styles.containerItem}>
          <Slider height={SCREEN_HEIGHT / 3} data={dataBanner} />
          <Separator />
          <RenderDetailDinas dataDinas={dataDinas} />
          <Item small center={menu.length > 2}>
            <FlatList
              data={menu}
              keyExtractor={(item) => item.index}
              renderItem={renderItem}
              horizontal={false}
              numColumns={3}
            />
          </Item>
        </Item>
      </View>
    )
  }

  const RenderMenu = ({ item }) => {
    return (
      <RippleTouch onPress={() => navigate('AboutDinasScreen', { id: getParam('id') })}>
        <Item center key={item.index} style={styles.menuContainer}>
          <RenderIf condition={item.imageUrl}>
            <Image source={item.imageUrl} style={styles.iconMenu} />
          </RenderIf>
          <RenderIf condition={!item.imageUrl}>
            <Image source={Images.ic_empty_state} style={styles.iconMenu} />
          </RenderIf>
          <Item small center>
            <Text primary tiny numberOfLines={1}>
              {item.name}
            </Text>
          </Item>
        </Item>
      </RippleTouch>
    )
  }

  const renderItem = ({ item }) => {
    return <RenderMenu item={item} />
  }

  return (
    <Container loading={loading}>
      <RenderItem />
    </Container>
  )
}

DetailMenu.navigationOptions = ({ navigation }) => ({
  title: 'Dinas'
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
  }
})

const mapStateToProps = (state) => ({
  getDetailDinasPayload: state.getDetailDinas.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(GetDetailDinasActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailMenu)
