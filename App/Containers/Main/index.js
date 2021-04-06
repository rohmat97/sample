/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import TenantActions from '../../Redux/TenantRedux'
import { Image, StyleSheet } from 'react-native'
import { Images } from '../../Themes'
import {
  Item,
  Footer,
  Text,
  RippleTouch,
  Section,
  Icon,
  Container,
  RenderIf,
  Modal,
  Button
} from '../../Presentational'
import { WHITE_GREY_01, WHITE, BLUE } from '../../Themes/Colors'
import { SECTION } from '../../Themes/ApplicationStyles'
import TimerMixin from 'react-timer-mixin'
import PropTypes from 'prop-types'

const ItemTenant = ({ item, onPress }) => {
  return (
    <Item small>
      <RippleTouch onPress={() => onPress(item)}>
        <Item small>
          <Image source={{ uri: encodeURI(item.imageUrl) }} style={styles.logo} />
        </Item>
      </RippleTouch>
    </Item>
  )
}

function Main(props) {
  const { token, tokenAPIPayload, tenantPayload, tenantRequest, removeToken, navigation } = props
  const [loading, setLoading] = useState(true)
  const [tenants, setTenants] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const { navigate } = navigation

  useEffect(() => {
    if (token && tokenAPIPayload) {
      tenantRequest()
    }
  }, [])

  useEffect(() => {
    if (tenantPayload && tenantPayload.content) {
      setTenants(tenantPayload.content)
      setLoading(false)
    }
  }, [tenantPayload])

  useEffect(() => {
    if (tokenAPIPayload) {
      tenantRequest()
    }
  }, [tokenAPIPayload])

  const onNavigation = (item) => {
    const { id, level, tenancyName } = item
    navigate('MainTabScreen', { tenantId: id, level, tenancyName })
  }

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const handleLogout = async () => {
    TimerMixin.setTimeout(() => {
      toggleModal()
    }, 0)

    TimerMixin.setTimeout(() => {
      removeToken()
    }, 200)
  }

  return (
    <Container loading={loading} style={{ paddingTop: 35, backgroundColor: WHITE_GREY_01 }}>
      <Image source={Images.background_homescreen} style={styles.backgroundImage} resizeMode="stretch" />
      <Section>
        <Item>
          <Item small>
            <Image source={Images.indohub} style={styles.logo} />
          </Item>
        </Item>
      </Section>
      <Section>
        <Item>
          <RippleTouch onPress={() => navigate('CctvScreen')}>
            <Item center plain>
              <Image source={Images.ic_map} style={styles.icon} />
            </Item>
          </RippleTouch>
          <Item center plain>
            <Text secondary large bold>
              Map CCTV
            </Text>
          </Item>
        </Item>
      </Section>
      <Section>
        <Item center small>
          <Item plain style={{ borderBottomColor: WHITE, borderBottomWidth: 2, width: '60%' }}>
            <Text secondary large bold>
              Silakan pilih lokasi anda
            </Text>
          </Item>
        </Item>
        {tenants.map((item) => {
          return <ItemTenant key={item.id} item={item} onPress={onNavigation} />
        })}
      </Section>
      <Footer borderWidth={0} backgroundColor={'transparent'}>
        <Item center>
          <RenderIf condition={token}>
            <Item center style={{ backgroundColor: BLUE, width: '35%', borderRadius: 4 }}>
              <RippleTouch onPress={toggleModal}>
                <Item row plain>
                  <Icon name="logout" color={WHITE} size={18} />
                  <Text bold style={{ paddingLeft: 8, color: WHITE }}>
                    KELUAR
                  </Text>
                </Item>
              </RippleTouch>
            </Item>
          </RenderIf>
          <RenderIf condition={!token}>
            <Item center style={{ backgroundColor: BLUE, width: '35%', borderRadius: 4 }}>
              <RippleTouch onPress={() => navigate('LoginScreen')}>
                <Item row plain>
                  <Icon name="login" color={WHITE} size={18} />
                  <Text bold style={{ paddingLeft: 8, color: WHITE }}>
                    MASUK
                  </Text>
                </Item>
              </RippleTouch>
            </Item>
          </RenderIf>
        </Item>
      </Footer>
      <Modal isVisible={visibleModal} containerStyle={SECTION}>
        <Text large>Apakah anda yakin ingin keluar?</Text>
        <Item row style={{ width: '100%', paddingBottom: 0 }}>
          <Item small style={{ width: '45%', marginRight: '5%' }}>
            <Button onPress={handleLogout} reverse uppercase secondary>
              Ya
            </Button>
          </Item>
          <Item small style={{ width: '45%' }}>
            <Button secondary onPress={toggleModal} uppercase>
              Tidak
            </Button>
          </Item>
        </Item>
      </Modal>
    </Container>
  )
}

Main.navigationOptions = () => ({
  header: null
})

Main.propTypes = {
  tenant: PropTypes.array,
  loading: PropTypes.bool,
  visibleModal: PropTypes.bool
}

Main.defaultProps = {
  tenant: [],
  loading: true,
  visibleModal: false
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 50,
    width: '100%'
  },
  icon: {
    height: 60,
    width: 60
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  tokenAPIPayload: state.tokenAPI.payload,
  tenant: state.tenant.payload,
  tenantPayload: state.tenant.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, TenantActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
