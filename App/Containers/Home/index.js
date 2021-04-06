import React, { useEffect, useState } from 'react'
import { Image, View, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GetAllBannerActions from '../../Redux/GetAllBannerRedux'
import BroadcastDashboardActions from '../../Redux/BroadcastDashboardRedux'
import MenuActions from '../../Redux/MenuRedux'
import { Images } from '../../Themes'
import { Item, Modal, Text, RippleTouch, Button, Container } from '../../Presentational'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { WHITE_GREY_01, WHITE, DARK_BLUE } from '../../Themes/Colors'
import Slider from '../../Presentational/Introduction/Slider'
import { getScreenName } from '../../Transforms/Common'
import { SCREEN_WIDTH } from '../../Themes/Metrics'

export const RenderMenu = ({ item, navigate }) => {
  const screenname = getScreenName(item.code).screen
  if (item.status && screenname) {
    return (
      <RippleTouch onPress={() => navigate(item.status, item.code)}>
        <Item key={item.index} style={styles.menuContainer}>
          <Image source={{ uri: encodeURI(item.imageUrl) }} style={styles.iconMenu} />
        </Item>
      </RippleTouch>
    )
  } else return null
}

export const RenderIcon = ({ tenancyName }) => {
  switch (tenancyName) {
    case 'JawaBarat':
      return <Image source={Images.jabarhub} style={styles.logo} />
    default:
      return <Image source={Images.bandunghub} style={styles.logo} />
  }
}

export const RenderItem = ({ tenancyName, slider, menu, renderItem, broadcast }) => {
  return (
    <View>
      <Item plain style={styles.containerItem}>
        <Item style={{ marginVertical: 20 }}>
          <RenderIcon tenancyName={tenancyName} />
        </Item>
        <Slider data={slider} />
        <Item center>
          <Item plain row>
            <Item plain center style={{ marginRight: 12 }}>
              <Image source={{ uri: encodeURI(broadcast ? broadcast.image : '') }} style={styles.icon} />
            </Item>
            <Item plain center style={{ marginTop: 4 }}>
              <Text white medium bold>
                {broadcast ? broadcast.content : ''}
              </Text>
            </Item>
          </Item>
        </Item>
        <Item backgroundColor={WHITE} style={{ paddingHorizontal: SCREEN_WIDTH / 14 }}>
          <FlatList
            data={menu}
            keyExtractor={(item) => item.index}
            renderItem={renderItem}
            horizontal={false}
            numColumns={4}
          />
        </Item>
      </Item>
    </View>
  )
}

function Home(props) {
  const {
    allBanner,
    broadcastDashboard,
    menu,
    getAllBannerRequest,
    broadcastDashboardRequest,
    menuRequest,
    navigation
  } = props
  const { navigate, state } = navigation
  const { tenantId, level, tenancyName } = state.params
  const [dataBanner, setdataBanner] = useState('')
  const [dataBroadcastDashboad, setdataBroadcastDashboad] = useState('')
  const [dataMenu, setdataMenu] = useState([])
  const [visibleModal, setvisibleModal] = useState(false)

  useEffect(() => {
    getAllBannerRequest({ tenantId })
    broadcastDashboardRequest({ tenantId })
    menuRequest({ tenantId, level })
  }, [])

  useEffect(() => {
    if (allBanner && allBanner.content) {
      setdataBanner(allBanner.content)
    }

    if (broadcastDashboard && broadcastDashboard.content) {
      setdataBroadcastDashboad(broadcastDashboard.content)
    }

    if (menu && menu.content) {
      setdataMenu(menu.content)
    }
  }, [allBanner, broadcastDashboard, menu])

  const renderItem = ({ item }) => {
    return <RenderMenu item={item} navigate={navigateScreen} />
  }

  const navigateScreen = (status, code) => {
    const screenname = getScreenName(code).screen
    if (status && screenname) navigate(screenname, { tenantId })
    else setvisibleModal(true)
  }

  const closeModal = () => {
    setvisibleModal(false)
  }

  return (
    <Container>
      <RenderItem
        tenancyName={tenancyName}
        slider={dataBanner}
        menu={dataMenu}
        renderItem={renderItem}
        broadcast={dataBroadcastDashboad}
      />
      <Modal isVisible={visibleModal}>
        <Item center width={'100%'}>
          <Item>
            <Text medium bold>
              Sedang dalam tahap pengembangan.
            </Text>
          </Item>
          <Item width={'50%'}>
            <Button onPress={closeModal} reverse uppercase secondary>
              Ok
            </Button>
          </Item>
        </Item>
      </Modal>
    </Container>
  )
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  icon: {
    height: 28,
    width: 28,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  menuContainer: {
    borderColor: WHITE_GREY_01,
    borderWidth: 3,
    borderRadius: 12,
    padding: 8,
    margin: 8
  },
  iconMenu: {
    height: 52,
    width: 52
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  containerItem: {
    paddingTop: isIphoneX() ? 32 : 0,
    backgroundColor: DARK_BLUE
  }
})

const mapStateToProps = (state) => ({
  allBanner: state.allBanner.payload,
  broadcastDashboard: state.broadcastDashboard.payload,
  menu: state.menu.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(GetAllBannerActions, BroadcastDashboardActions, MenuActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
