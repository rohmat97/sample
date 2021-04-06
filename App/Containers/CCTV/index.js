import React, { useState, useEffect } from 'react'
import { Platform, Animated } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StackActions, NavigationActions } from 'react-navigation'
import TimerMixin from 'react-timer-mixin'
import AllCctvActions from '../../Redux/AllCctvRedux'
import AllEventReportActions from '../../Redux/AllEventReportRedux'
import SearchCctvActions from '../../Redux/SearchCctvRedux'
import TenantActions from '../../Redux/TenantRedux'
import EvacuationCctvAction from '../../Redux/EvacuationCctvReduxRedux'
import EvacuationCctvByCategoryActions from '../../Redux/EvacuationByCategoryRedux.js'
import TokenizerActions from '../../Redux/TokenizerRedux'
import ProfileActions from '../../Redux/ProfileRedux'
import { Images } from '../../Themes'
import { Container } from '../../Presentational'
import GetAllDinasActions from '../../Redux/GetAllDinasRedux'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultRegion } from '../../Config/ApiConfig'
import { SCREEN_HEIGHT } from '../../Themes/Metrics'
import { EmergencyModeMaps } from './Component'

function CCTV(props) {
  const {
    navigation,
    allCctvRequest,
    allCctv,
    searchCctv,
    category,
    searchCctvRequest,
    tokenAPIPayload,
    token,
    evacuationByCategoryRequest,
    getAllDinasRequest,
    getAllDinasPayload,
    allEventReport,
    allEventReportRequest,
    profileRequest,
    profilePayload
  } = props
  const { navigate } = navigation
  const [region, setRegion] = useState(defaultRegion)
  const [cctvMarker, setCctvMarker] = useState([])
  const [evacuationCctvMarker, setevacuationCctvMarker] = useState([])
  const [eventReportMarker, setEventReportMarker] = useState([])
  const [searchName, setSearchName] = useState('')
  const [listSearch, setListSearch] = useState([])
  const [listSearchVisible, setListSearchVisible] = useState(false)
  const [onPressFocus, setOnPressFocus] = useState(true)
  const [tenantId] = useState(navigation.getParam('tenantId') || 2)
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [statusProfile, setStatusProfile] = useState(false)
  const [icon] = useState([
    { id: 1, nama: 'Semua' },
    { id: 2, nama: 'CCTV' },
    { id: 3, nama: 'Event' },
    { id: 4, nama: 'Dinas' }
  ])
  const [iconEmergency] = useState([
    { id: 1, nama: 'Banjir' },
    { id: 2, nama: 'Angin Puting Beliung' },
    { id: 3, nama: 'Longsor' },
    { id: 4, nama: 'Tsunami' },
    { id: 5, nama: 'Gempa' },
    { id: 6, nama: 'Gunung Meletus' }
  ])
  const [emergencyMode, setemergencyMode] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [pressedButton, setPressedButton] = useState('Semua')
  const [pressedButtonBefore, setPressedButtonBefore] = useState('')
  const [menuMarker, setMenuMarker] = useState([])
  let [eventIcon] = useState()
  let [i, seti] = useState(0)
  const [start, setstart] = useState(false)
  const [reload, setreload] = useState(true)
  const [customMapStlyeNomal] = useState([])
  const [customMapStlyeEmergency] = useState([
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#212121'
        }
      ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#212121'
        }
      ]
    },
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'administrative.country',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e'
        }
      ]
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd'
        }
      ]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#181818'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#1b1b1b'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#2c2c2c'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#8a8a8a'
        }
      ]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#373737'
        }
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#3c3c3c'
        }
      ]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [
        {
          color: '#4e4e4e'
        }
      ]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161'
        }
      ]
    },
    {
      featureType: 'transit',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#000000'
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#3d3d3d'
        }
      ]
    }
  ])

  const moveToScrenDetailEvent = (marker, isMove) => {
    if (!isMove)
      navigate('DetailEventScreen', {
        id: marker.id,
        headline: marker.headline,
        address: marker.address,
        imagePost: marker.imageUrl,
        description: marker.description,
        userName: marker.user.fullName,
        userImage: marker.user.imageUrl
      })
  }

  const moveToScrenCCTVDetail = (marker, isMove) => {
    navigation.addListener('willFocus', () => backPressed())
    if (!isMove) {
      navigate('CctvChatScreen', {
        title: marker.title,
        address: marker.address,
        longitude: marker.coordinate.longitude,
        latitude: marker.coordinate.latitude,
        link: marker.link
      })
    }
  }

  const MoveToScreenEvakuasiDetail = (marker) => {
    navigate('TitikEvakuasi', {
      title: marker.evacuationSite,
      id: marker.id,
      category: marker.category,
      coordinate: marker.coordinate,
      address: marker.address
    })
  }

  const toggleModal = () => {
    setVisibleModal(!visibleModal)
  }

  const toggleModalProfile = () => {
    setVisibleModal(!visibleModal)
    navigate('ProfileScreen')
  }

  const backPressed = () => {
    setSearchName('')
    setListSearch([])
    setListSearchVisible(false)
    setOnPressFocus(true)
  }

  const updateSearch = (searchName) => {
    setSearchName(searchName)
    searchCctvRequest({ title: searchName })
  }

  const statusTrue = () => {
    setemergencyMode(true)
    evacuationByCategoryRequest({ latitude: region.latitude, longitude: region.longitude, Category: 'Banjir' })
    setPressedButton(1)
    toggleModal()
  }

  const statusFalse = () => {
    setemergencyMode(false)
    setPressedButton('Semua')
  }

  const fetchCategory = (item) => {
    setLoading(true)
    setevacuationCctvMarker([])
    setPressedButton(item.id)
    evacuationByCategoryRequest({ latitude: region.latitude, longitude: region.longitude, Category: item.nama })
  }

  const checkStatus = (stat) => {
    if (stat) {
      setStatusProfile(stat)
      if (token !== null) {
        profileRequest()
      }
      TimerMixin.setTimeout(() => {}, 1000)
    }
  }

  useEffect(() => {
    if (statusProfile) {
      toggleModal()
      setStatusProfile(false)
    }
    if (profilePayload) {
      if (profilePayload.content) {
        if (profilePayload.content.isConfirmed === false) {
          navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'VerificationScreen' })]
            })
          )
        }
      }
    }
    if (token) {
      if (token.isConfirmed === false) {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'VerificationScreen' })]
          })
        )
      }
      setLoadingData(true)
    }
  }, [profilePayload, token])
  const Refesh = () => {
    allCctvRequest({ tenantId: tenantId })
    allEventReportRequest({ latitude: region.latitude, longitude: region.longitude })
    getAllDinasRequest()
    setMenuMarker([])
    setMenuMarker([
      {
        coordinate: {
          latitude: region.latitude,
          longitude: region.longitude
        },
        title: 'Your Place',
        description: 'This is your place',
        imageUrl: Images.ic_report
      }
    ])
  }
  useEffect(() => {
    if (token !== null) {
      profileRequest()
    }
    setCctvMarker([])
    setevacuationCctvMarker([])
    setEventReportMarker([])
    setListSearch([])
    setSearchName('')
    navigator.geolocation.getCurrentPosition((position) => {
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.75,
        longitudeDelta: 0.00421 * 1.75
      })

      setMenuMarker([
        {
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          title: 'Your Place',
          description: 'This is your place',
          imageUrl: Images.ic_report
        },
        ...menuMarker
      ])
    })
    this.index = 0
    this.animation = new Animated.Value(0)
  }, [])

  useEffect(() => {
    while (i < 1) {
      if (pressedButton !== pressedButtonBefore) {
        setPressedButtonBefore(pressedButton)
        if (!start) {
          setstart(true)
        }
      }
      if (reload) {
        if (pressedButton === 'Semua') {
          setreload(false)
          TimerMixin.setTimeout(() => {
            allCctvRequest({ tenantId: tenantId })
            allEventReportRequest({ latitude: region.latitude, longitude: region.longitude })
            getAllDinasRequest()
            setreload(true)
            seti(0)
          }, 180000)
          setstart(false)
        } else if (pressedButton === 'CCTV') {
          if (reload) {
            setreload(false)
            TimerMixin.setTimeout(() => {
              allCctvRequest({ tenantId: tenantId })
              setreload(true)
              i = 0
            }, 180000)
            setstart(false)
          }
          setstart(false)
        } else if (pressedButton === 'Event') {
          if (reload) {
            setreload(false)
            TimerMixin.setTimeout(() => {
              allEventReportRequest({ latitude: region.latitude, longitude: region.longitude })
              setreload(true)
              i = 0
            }, 180000)
            setstart(false)
          }
        } else if (pressedButton === 'Dinas') {
          if (reload) {
            setreload(false)
            TimerMixin.setTimeout(() => {
              getAllDinasRequest()
              setreload(true)
              i = 0
            }, 180000)
            setstart(false)
          }
        }
      }
      seti(i++)
    }
  }, [pressedButton, pressedButtonBefore, start, reload, i])
  useEffect(() => {
    if (tokenAPIPayload) {
      allCctvRequest({ tenantId: tenantId })
      allEventReportRequest({ latitude: region.latitude, longitude: region.longitude })
      getAllDinasRequest()
    }
  }, [tokenAPIPayload])

  useEffect(() => {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / (SCREEN_HEIGHT / 4 - 50) + 0.3)
      if (index >= menuMarker.length) {
        index = menuMarker.length - 1
      }
      if (index <= 0) {
        index = 0
      }
      clearTimeout(this.regionTimeout)
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index
          const { coordinate } = menuMarker[index]
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.00922 * 1.75,
              longitudeDelta: 0.00421 * 1.75
            },
            350
          )
        }
      }, 10)
    })
  }, [menuMarker])

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (searchName) {
        searchCctvRequest({ title: searchName })
      }
    }
  }, [searchName])

  useEffect(() => {
    if (allCctv) {
      setCctvMarker(allCctv.content)
    }
  }, [allCctv])

  useEffect(() => {
    if (getAllDinasPayload) {
      setMenuMarker([...menuMarker, ...getAllDinasPayload.content])
    }
  }, [getAllDinasPayload])

  useEffect(() => {
    if (searchCctv) {
      if (searchCctv.content.length > 0) {
        setListSearch(searchCctv.content)
        setListSearchVisible(true)
      } else {
        setListSearch([{ title: 'Data tidak ditemukan', dontMove: true }])
      }
    }
  }, [searchCctv])

  useEffect(() => {
    if (category) {
      setevacuationCctvMarker(category)
      if (evacuationCctvMarker.length > 0) {
        TimerMixin.setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
  }, [category, evacuationCctvMarker])

  useEffect(() => {
    if (allEventReport) {
      setEventReportMarker(allEventReport.content)
    }
  }, [allEventReport])

  useEffect(() => {
    if (cctvMarker.length > 0 && eventReportMarker.length > 0) {
      backPressed()
      TimerMixin.setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [cctvMarker, menuMarker, eventReportMarker, profilePayload, loading, loadingData, getAllDinasPayload])

  this.bs = React.createRef()

  return (
    <Container loading={loading}>
      <EmergencyModeMaps
        customMapStlyeNomal={customMapStlyeNomal}
        customMapStlyeEmergency={customMapStlyeEmergency}
        emergencyMode={emergencyMode}
        loading={loading}
        PROVIDER_GOOGLE={PROVIDER_GOOGLE}
        region={region}
        evacuationCctvMarker={evacuationCctvMarker}
        MoveToScreenEvakuasiDetail={MoveToScreenEvakuasiDetail}
        menuMarker={menuMarker}
        icon={icon}
        iconEmergency={iconEmergency}
        setPressedButton={setPressedButton}
        pressedButton={pressedButton}
        fetchCategory={fetchCategory}
        navigate={navigate}
        setVisibleModal={setVisibleModal}
        token={token}
        statusFalse={statusFalse}
        cctvMarker={cctvMarker}
        moveToScrenCCTVDetail={moveToScrenCCTVDetail}
        eventReportMarker={eventReportMarker}
        eventIcon={eventIcon}
        moveToScrenDetailEvent={moveToScrenDetailEvent}
        setSearchName={setSearchName}
        setOnPressFocus={setOnPressFocus}
        backPressed={backPressed}
        searchName={searchName}
        searchCctvRequest={searchCctvRequest}
        listSearchVisible={listSearchVisible}
        onPressFocus={onPressFocus}
        updateSearch={updateSearch}
        listSearch={listSearch}
        visibleModal={visibleModal}
        toggleModal={toggleModal}
        statusTrue={statusTrue}
        toggleModalProfile={toggleModalProfile}
        profilePayload={profilePayload}
        checkStatus={checkStatus}
        Refesh={Refesh}
      />
    </Container>
  )
}

CCTV.navigationOptions = () => ({
  header: null
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  tokenAPIPayload: state.tokenAPI.payload,
  tenantPayload: state.tenant.payload,
  evacuationCctv: state.evacuationCctv.payload,
  category: state.evacuationCctvByCategory.payload,
  getAllDinasPayload: state.getAllDinas.payload,
  fetchDinas: state.getAllDinas.fetching,
  allCctv: state.allCctv.payload,
  fetchCctv: state.allCctv.fetching,
  allEventReport: state.allEventReport.payload,
  fetchEvent: state.allEventReport.fetching,
  searchCctv: state.searchCctv.payload,
  profilePayload: state.profile.payload,
  fetchProfile: state.profile.fetching
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(
      AllCctvActions,
      SearchCctvActions,
      TenantActions,
      EvacuationCctvAction,
      EvacuationCctvByCategoryActions,
      GetAllDinasActions,
      AllEventReportActions,
      ProfileActions,
      TokenizerActions
    ),
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CCTV)
