import React from 'react'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  ScrollView,
  Modal,
  Platform
} from 'react-native'
import { Item, Text, RippleTouch, Section, RenderIf, Button, Container, Icon } from '../../Presentational'
import MapView, { Callout, Marker } from 'react-native-maps'
import { WHITE, WHITE_GREY_03, RED, GREY, BLACK } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'
import { Images } from '../../Themes'
import SearchBar from 'react-native-dynamic-search-bar'
import BottomSheet from 'reanimated-bottom-sheet'

export const EmergencyModeMaps = ({
  loading,
  PROVIDER_GOOGLE,
  region,
  evacuationCctvMarker,
  MoveToScreenEvakuasiDetail,
  menuMarker,
  icon,
  iconEmergency,
  setPressedButton,
  pressedButton,
  fetchCategory,
  emergencyMode,
  navigate,
  setVisibleModal,
  token,
  statusFalse,
  cctvMarker,
  moveToScrenCCTVDetail,
  eventReportMarker,
  eventIcon,
  moveToScrenDetailEvent,
  setSearchName,
  setOnPressFocus,
  backPressed,
  searchName,
  searchCctvRequest,
  listSearchVisible,
  onPressFocus,
  updateSearch,
  listSearch,
  visibleModal,
  toggleModal,
  statusTrue,
  toggleModalProfile,
  checkStatus,
  profilePayload,
  Refesh,
  customMapStlyeEmergency,
  customMapStlyeNomal
}) => (
  <Container loading={loading} style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={emergencyMode ? customMapStlyeEmergency : customMapStlyeNomal}
      style={styles.map}
      initialRegion={region}
      region={region}
      minZoomLevel={7}
      maxZoomLevel={18}
      showsUserLocation={true}
      showsMyLocationButton={false}
      followsUserLocation={true}
      ref={(map) => (this.map = map)}
    >
      <RenderIf condition={emergencyMode}>
        {evacuationCctvMarker.map((marker, i) => {
          const icon = Images.ic_emergency_point
          return (
            <Marker key={i} icon={icon} coordinate={marker.coordinate}>
              <Callout
                onPress={() => {
                  MoveToScreenEvakuasiDetail(marker)
                  // alert(JSON.stringify(marker))
                }}
              >
                <View style={{ width: SCREEN_WIDTH / 4 }}>
                  <Text style={styles.calloutTitle}>{marker.evacuationSite}</Text>
                  <Text style={styles.calloutDescription}>{marker.address}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </RenderIf>
      <RenderIf condition={!emergencyMode}>
        <MarkerNoarmalMaps
          pressedButton={pressedButton}
          cctvMarker={cctvMarker}
          moveToScrenCCTVDetail={moveToScrenCCTVDetail}
          menuMarker={menuMarker}
          icon={icon}
          eventReportMarker={eventReportMarker}
          eventIcon={eventIcon}
          moveToScrenDetailEvent={moveToScrenDetailEvent}
        />
      </RenderIf>
    </MapView>
    <RenderIf condition={emergencyMode}>
      <RenderSearchBar
        icon={iconEmergency}
        setPressedButton={setPressedButton}
        pressedButton={pressedButton}
        fetchCategory={fetchCategory}
        emergencyMode={emergencyMode}
        Refesh={Refesh}
      />
      <BottomSheet
        ref={this.bs}
        initialSnap={0}
        snapPoints={[
          SCREEN_HEIGHT / 2 - SCREEN_HEIGHT * 0.0175,
          SCREEN_HEIGHT / 5 + ((Platform.OS === '') === 'ios' ? 88 : 68)
        ]}
        renderContent={() => (
          <ContentBottomSheet
            checkStatus={checkStatus}
            toggleModal={toggleModal}
            menuMarker={menuMarker}
            navigate={navigate}
            emergencyMode={emergencyMode}
            token={token}
            statusFalse={statusFalse}
            setVisibleModal={setVisibleModal}
          />
        )}
        renderHeader={() => (
          <HeaderBottomSheet
            pressedButton={pressedButton}
            emergencyMode={emergencyMode}
            category={iconEmergency}
            navigate={navigate}
          />
        )}
        enabledContentGestureInteraction={false}
      />
    </RenderIf>
    <RenderIf condition={!emergencyMode}>
      <RenderSearchBar
        setSearchName={setSearchName}
        setOnPressFocus={setOnPressFocus}
        backPressed={backPressed}
        searchName={searchName}
        searchCctvRequest={searchCctvRequest}
        listSearchVisible={listSearchVisible}
        onPressFocus={onPressFocus}
        updateSearch={updateSearch}
        listSearch={listSearch}
        moveToScrenCCTV={moveToScrenCCTVDetail}
        icon={icon}
        setPressedButton={setPressedButton}
        pressedButton={pressedButton}
        Refesh={Refesh}
      />
      <BottomSheet
        ref={this.bs}
        initialSnap={0}
        snapPoints={[SCREEN_HEIGHT / 2 + SCREEN_HEIGHT * 0.075, SCREEN_HEIGHT / 5 + (Platform.OS === 'ios' ? 88 : 68)]}
        renderContent={() => (
          <ContentBottomSheet
            menuMarker={menuMarker}
            navigate={navigate}
            emergencyMode={emergencyMode}
            token={token}
            statusFalse={statusFalse}
            setVisibleModal={setVisibleModal}
            checkStatus={checkStatus}
          />
        )}
        renderHeader={() => <HeaderBottomSheet emergencyMode={emergencyMode} token={token} navigate={navigate} />}
        enabledContentGestureInteraction={false}
      />
      {Platform.OS === 'ios' ? (
        <View>
          <ModalEvakuasi
            token={token}
            profilePayload={profilePayload}
            visibleModal={visibleModal}
            toggleModal={toggleModal}
            statusTrue={statusTrue}
            toggleModalProfile={toggleModalProfile}
          />
        </View>
      ) : (
        <View>
          <ModalEvakuasi
            token={token}
            profilePayload={profilePayload}
            visibleModal={visibleModal}
            toggleModal={toggleModal}
            statusTrue={statusTrue}
            toggleModalProfile={toggleModalProfile}
          />
        </View>
      )}
    </RenderIf>
  </Container>
)

const MarkerNoarmalMaps = ({
  pressedButton,
  cctvMarker,
  moveToScrenCCTVDetail,
  menuMarker,
  icon,
  eventReportMarker,
  eventIcon,
  moveToScrenDetailEvent
}) => (
  <Section>
    <RenderIf condition={pressedButton === 'Semua'}>
      <RenderCctvMarker cctvMarker={cctvMarker} moveToScrenCCTVDetail={moveToScrenCCTVDetail} />
      <RenderMenuMarker menuMarker={menuMarker} icon={icon} />
      <RenderEventMarker
        eventReportMarker={eventReportMarker}
        icon={icon}
        eventIcon={eventIcon}
        moveToScrenDetailEvent={moveToScrenDetailEvent}
      />
    </RenderIf>
    <RenderIf condition={pressedButton === 'Event'}>
      <RenderEventMarker
        eventReportMarker={eventReportMarker}
        icon={icon}
        eventIcon={eventIcon}
        moveToScrenDetailEvent={moveToScrenDetailEvent}
      />
    </RenderIf>
    <RenderIf condition={pressedButton === 'CCTV'}>
      <RenderCctvMarker cctvMarker={cctvMarker} moveToScrenCCTVDetail={moveToScrenCCTVDetail} />
    </RenderIf>
    <RenderIf condition={pressedButton === 'Dinas'}>
      <RenderMenuMarker menuMarker={menuMarker} icon={icon} />
    </RenderIf>
  </Section>
)

const RenderEventMarker = ({ eventReportMarker, icon, eventIcon, moveToScrenDetailEvent }) => {
  if (eventReportMarker && eventReportMarker.length > 0) {
    return eventReportMarker.map((reportMarker, x) => {
      eventIcon = switchSmallIcon(reportMarker.headline)
      return (
        <Marker key={x} icon={icon} coordinate={reportMarker.coordinate}>
          <Image source={eventIcon} style={styles.markerDinas} />
          <Callout
            onPress={() => {
              moveToScrenDetailEvent(reportMarker)
            }}
          >
            <View style={{ width: SCREEN_WIDTH / 2 }}>
              <Text style={styles.calloutTitle}>{reportMarker.headline}</Text>
              <Text style={styles.calloutDescription}>{reportMarker.address}</Text>
            </View>
          </Callout>
        </Marker>
      )
    })
  } else return null
}

const RenderCctvMarker = ({ cctvMarker, moveToScrenCCTVDetail }) => {
  if (cctvMarker && cctvMarker.length > 0) {
    return cctvMarker.map((marker, i) => {
      const icon = marker.isActive ? Images.ic_cctc_active : Images.ic_cctc_inactive
      return (
        <Marker key={i} icon={icon} coordinate={marker.coordinate}>
          <Callout
            onPress={() => {
              if (marker.isActive) moveToScrenCCTVDetail(marker)
            }}
          >
            <View style={{ width: SCREEN_WIDTH / 4 }}>
              <Text style={styles.calloutTitle}>{marker.title}</Text>
              <Text style={styles.calloutDescription}>{marker.address}</Text>
            </View>
          </Callout>
        </Marker>
      )
    })
  } else return null
}

const RenderMenuMarker = ({ menuMarker, icon }) => {
  if (menuMarker && menuMarker.length > 0) {
    return menuMarker.map((marker, i) => {
      if (i !== 0) {
        return (
          <Marker key={i} icon={icon} coordinate={marker.coordinate}>
            <Image source={{ uri: (marker && marker.imageUrl) || '' }} style={styles.markerDinas} />
          </Marker>
        )
      } else return null
    })
  } else return null
}

export const ModalEvakuasi = ({ token, toggleModalProfile, visibleModal, toggleModal, statusTrue }) => (
  <View style={styles.container}>
    <Modal transparent={true} visible={visibleModal}>
      <View style={styles.modal}>
        {token ? (
          token.statusVerified === 1 ? (
            <Text medium style={{ margin: 10, paddingTop: 10 }}>
              Anda akan mengaktifkan Emergency Mode. Semua Laporan palsu akan ditindak lanjuti sesuai Undang-Undang yang
              berlaku. Apakah anda yakin untuk melanjutkan ?
            </Text>
          ) : (
            <Text medium style={{ margin: 10, paddingTop: 10 }}>
              Akun anda tidak dapat mengaktifkan mode ini karena belum terverifikasi, apakah anda akan melanjutkan
              verifikasi ?
            </Text>
          )
        ) : (
          <Text medium style={{ margin: 10, paddingTop: 10 }}>
            Akun anda tidak dapat mengaktifkan mode ini karena belum terverifikasi, apakah anda akan melanjutkan
            verifikasi ?
          </Text>
        )}

        <Item />
        <View style={{ flexDirection: 'row' }}>
          <Button emergencyCancle onPress={toggleModal}>
            Batalkan
          </Button>
          {token ? (
            token.statusVerified === 1 ? (
              <Button onPress={statusTrue} emergency>
                Ya, Lanjutkan
              </Button>
            ) : (
              <Button onPress={toggleModalProfile} emergency>
                Ya, Lanjutkan
              </Button>
            )
          ) : (
            <Button onPress={toggleModalProfile} emergency>
              Ya, Lanjutkan
            </Button>
          )}
        </View>
      </View>
    </Modal>
  </View>
)
export const HeaderBottomSheet = ({ emergencyMode, navigate, category, pressedButton }) => (
  <View>
    <TouchableOpacity
      style={styles.reportIcon}
      onPress={() => {
        emergencyMode
          ? navigate('EmergencyReportScreen', { headline: category[pressedButton - 1].nama })
          : navigate('CategoryScreen')
      }}
    >
      <Image source={Images.ic_report} />
    </TouchableOpacity>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  </View>
)

export const HeaderIcon = ({ Refesh }) => (
  <View style={{ width: 50, marginLeft: 10, marginTop: 5 }}>
    <TouchableOpacity style={styles.reportIcon} onPress={() => Refesh()}>
      <Image source={Images.ic_refresh} />
    </TouchableOpacity>
  </View>
)

export const ContentBottomSheet = ({
  checkStatus,
  menuMarker,
  navigate,
  emergencyMode,
  token,
  statusFalse,
  setVisibleModal
}) => (
  <Item backgroundColor={WHITE}>
    <Section>
      <Item plain row spaceAround>
        <Item plain center>
          <Text primary bold>
            Jelajahi Dinas terkait disini
          </Text>
          <Text primary xtiny>
            Geser Untuk melihat titik Dinas terkait
          </Text>
        </Item>
        <RenderEvakuasiButton
          checkStatus={checkStatus}
          emergencyMode={emergencyMode}
          statusFalse={statusFalse}
          token={token}
          navigate={navigate}
          setVisibleModal={setVisibleModal}
        />
      </Item>
    </Section>
    <RenderIf condition={!emergencyMode}>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT / 4 - 50}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation
                }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {menuMarker.map((marker, i) => {
          if (i === 0) {
            return <RenderMenu marker={marker} />
          } else {
            return (
              <RippleTouch key={i} onPress={() => navigate('DetailMenuScreen', { id: marker.id })}>
                <RenderMenu marker={marker} />
              </RippleTouch>
            )
          }
        })}
      </Animated.ScrollView>
    </RenderIf>
  </Item>
)

const RenderEvakuasiButton = ({ checkStatus, emergencyMode, statusFalse, token, navigate, setVisibleModal }) => (
  <View>
    {emergencyMode ? (
      <TouchableOpacity onPress={() => statusFalse()}>
        <Item center style={styles.emergencyButton}>
          <Text primary xtiny style={{ color: RED }}>
            Matikan Mode Darurat
          </Text>
        </Item>
      </TouchableOpacity>
    ) : token ? (
      token.statusVerified === 1 ? (
        <TouchableOpacity onPress={() => setVisibleModal(true)}>
          <Item center style={styles.emergencyButton}>
            <Text primary xtiny style={{ color: RED }}>
              Aktifkan Mode Darurat
            </Text>
          </Item>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => checkStatus(true)}>
          <Item center style={styles.emergencyButton}>
            <Text primary xtiny style={{ color: RED }}>
              Aktifkan Mode Darurat
            </Text>
          </Item>
        </TouchableOpacity>
      )
    ) : (
      <TouchableOpacity onPress={() => navigate('ProfileScreen')}>
        <Item center style={styles.emergencyButton}>
          <Text primary xtiny style={{ color: RED }}>
            Aktifkan Mode Darurat
          </Text>
        </Item>
      </TouchableOpacity>
    )}
  </View>
)

const RenderMenu = ({ marker }) => (
  <Item center backgroundColor={WHITE_GREY_03} style={styles.menu}>
    <RenderIf condition={marker.imageUrl}>
      <Image source={marker.id ? { uri: marker.imageUrl } : marker.imageUrl} style={styles.logo} />
    </RenderIf>
    <RenderIf condition={!marker.imageUrl}>
      <Image source={Images.ic_empty_state} style={styles.logo} />
    </RenderIf>
    <Text primary xtiny numberOfLines={1}>
      {marker.title}
    </Text>
  </Item>
)

export const RenderSearchBar = ({
  setSearchName,
  setOnPressFocus,
  backPressed,
  searchName,
  searchCctvRequest,
  listSearchVisible,
  onPressFocus,
  listSearch,
  moveToScrenCCTV,
  icon,
  setPressedButton,
  pressedButton,
  fetchCategory,
  emergencyMode,
  Refesh
}) => (
  <View style={{ flex: 1, top: 16 }}>
    <RenderIf condition={!emergencyMode}>
      <Item style={{ flexDirection: 'row' }}>
        <SearchBar
          placeholder="Cari CCTV disini"
          onChangeText={(text) => {
            setSearchName(text)
            setOnPressFocus(false)
          }}
          onPressCancel={() => backPressed()}
          onPress={() => {
            if (searchName) {
              searchCctvRequest({ title: searchName })
              setOnPressFocus(true)
            }
          }}
          onPressToFocus={onPressFocus}
        />
      </Item>
    </RenderIf>
    <RenderIf condition={emergencyMode}>
      <View />
    </RenderIf>

    <RenderIf condition={listSearchVisible && !emergencyMode}>
      <FlatList
        data={listSearch}
        renderItem={({ item }) => <RenderItemSearching item={item} onPress={moveToScrenCCTV} />}
        keyExtractor={(item) => item.id}
        style={styles.listSearch}
      />
    </RenderIf>
    <RenderIf condition={emergencyMode}>
      <View>
        <RenderChips
          icon={icon}
          setPressedButton={setPressedButton}
          pressedButton={pressedButton}
          emergencyMode={emergencyMode}
          fetchCategory={fetchCategory}
          Refesh={Refesh}
        />
      </View>
    </RenderIf>
    <RenderIf condition={!emergencyMode}>
      <Item plain row spaceAround style={{ marginLeft: SCREEN_WIDTH * 0.1, marginRight: -SCREEN_WIDTH * 0.1 }}>
        <RenderChips
          icon={icon}
          setPressedButton={setPressedButton}
          pressedButton={pressedButton}
          emergencyMode={emergencyMode}
          fetchCategory={fetchCategory}
          Refesh={Refesh}
        />
      </Item>
    </RenderIf>
  </View>
)

const RenderItemSearching = ({ item, onPress }) => {
  return (
    <RippleTouch onPress={() => onPress(item, item.dontMove || false)}>
      <Item small>
        <Text medium>{item.title}</Text>
      </Item>
    </RippleTouch>
  )
}

const RenderChips = ({ icon, setPressedButton, pressedButton, fetchCategory, emergencyMode, Refesh }) => (
  <View>
    <RenderIf condition={emergencyMode}>
      <View style={(styles.listSearch, { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 24 })}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {icon.map((item, index) => {
            return (
              <RenderSingleChip
                key={index}
                item={item}
                setPressedButton={setPressedButton}
                pressedButton={pressedButton}
                fetchCategory={fetchCategory}
                emergencyMode={emergencyMode}
              />
            )
          })}
        </ScrollView>
      </View>
    </RenderIf>
    <RenderIf condition={!emergencyMode}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {icon.map((item, index) => {
          return (
            <RenderSingleChip
              key={index}
              item={item}
              setPressedButton={setPressedButton}
              pressedButton={pressedButton}
              fetchCategory={fetchCategory}
              emergencyMode={emergencyMode}
            />
          )
        })}
        <HeaderIcon emergencyMode={emergencyMode} Refesh={Refesh} />
      </View>
    </RenderIf>
  </View>
)

const RenderSingleChip = ({ item, setPressedButton, pressedButton, fetchCategory, emergencyMode }) => (
  <Item style={{ paddingRight: 10 }}>
    <Item center style={{ backgroundColor: WHITE, borderRadius: 12 }}>
      <Item row plain>
        <RenderIf condition={emergencyMode}>
          <TouchableOpacity
            style={{ paddingLeft: 8, paddingRight: 8 }}
            onPress={() => {
              fetchCategory(item)
            }}
          >
            <Text bold style={{ color: item.id === pressedButton ? RED : GREY }}>
              {`${item.id === pressedButton ? '•' : ''} ${item.nama}`}
            </Text>
          </TouchableOpacity>
        </RenderIf>
        <RenderIf condition={!emergencyMode}>
          <TouchableOpacity style={{ marginRight: 7, marginLeft: 7 }} onPress={() => setPressedButton(item.nama)}>
            <Text bold style={{ color: item.nama === pressedButton ? RED : GREY }}>
              {`${item.nama === pressedButton ? '•' : ''} ${item.nama}`}
            </Text>
          </TouchableOpacity>
        </RenderIf>
      </Item>
    </Item>
  </Item>
)

export const RenderDetailDinas = ({ dataDinas }) => {
  return (
    <Item style={{ paddingHorizontal: 8, marginBottom: -16 }}>
      <Item row plain>
        <Item center width={'20%'}>
          <RenderIf condition={dataDinas && dataDinas.imageUrl}>
            <Image source={{ uri: (dataDinas && dataDinas.imageUrl) || '' }} style={styles.iconDinas} />
          </RenderIf>
          <RenderIf condition={dataDinas && !dataDinas.imageUrl}>
            <Image source={Images.ic_empty_state} style={styles.iconDinas} />
          </RenderIf>
        </Item>
        <Item width={'80%'}>
          <Text large bold>
            {(dataDinas && dataDinas.title) || ''}
          </Text>
          <Item row small>
            <Icon name="map-marker" size={18} style={{ marginRight: 4 }} />
            <Item plain width={'90%'}>
              <Text primary tiny>
                {(dataDinas && dataDinas.address) || ''}
              </Text>
            </Item>
          </Item>
          <Item row plain>
            <Icon name="clock-outline" size={18} style={{ marginRight: 4, marginTop: -1 }} />
            <Text primary tiny>
              {(dataDinas && dataDinas.operationTime) || ''}
            </Text>
          </Item>
        </Item>
      </Item>
    </Item>
  )
}

export const switchSmallIcon = (headline) => {
  switch (headline) {
    case 'Banjir':
      return Images.ic_banjir_kecil
    case 'Tanah Retak':
      return Images.ic_tanah_retak_kecil
    case 'Angin Puting Beliung':
      return Images.ic_puting_beliung_kecil
    case 'Longsor':
      return Images.ic_longsor_kecil
    case 'Tsunami':
      return Images.ic_tsunami_kecil
    case 'Gempa':
      return Images.ic_gempa_kecil
    case 'Gunung Meletus':
      return Images.ic_gunung_meletus_kecil
    case 'Tawuran':
      return Images.ic_tawuran_kecil
    case 'Tabrakan':
      return Images.ic_tabrakan_kecil
    case 'Macet':
      return Images.ic_macet_kecil
    case 'Sampah Menumpuk':
      return Images.ic_sampah_kecil
    case 'Acara Warga':
      return Images.ic_acara_kecil
    case 'Lainnya':
      return Images.ic_lainnya_kecil
  }
}

export const HeaderPost = ({ eventIcon, headline, address, shareLink }) => (
  <Item style={styles.shadow}>
    <Item plain row style={{ justifyContent: 'space-around', marginTop: -10 }}>
      <Item row>
        <Item plain width={'12%'} style={{ marginLeft: 10 }}>
          <Image source={eventIcon} style={styles.icon} />
        </Item>
        <Item plain width={'70%'} style={{ marginLeft: 5 }}>
          <Text medium bold style={{ color: BLACK }}>
            {headline}
          </Text>
          <Text medium bold style={styles.text}>
            {address}
          </Text>
        </Item>
        <Item plain width={'10%'} style={{ marginLeft: 10 }}>
          <TouchableOpacity
            onPress={() => {
              shareLink()
            }}
          >
            <Image source={Images.share} style={styles.icon} />
          </TouchableOpacity>
        </Item>
      </Item>
    </Item>
  </Item>
)

export const DescriptionPost = ({ userName, userImage, description }) => (
  <Item row style={styles.userDesc}>
    <Item width={'10%'} style={{ marginRight: 5 }}>
      <Image source={userImage ? { uri: userImage } : Images.ic_default_user} style={styles.iconDesc} />
    </Item>
    <Item plain row width={'82%'}>
      <Text>
        <Text style={styles.textDesc}>{userName}</Text>
        <Text>{'  '}</Text>
        <Text style={{ color: BLACK, fontSize: 15 }}>{description}</Text>
      </Text>
    </Item>
  </Item>
)

const styles = StyleSheet.create({
  markerDinas: {
    padding: 8,
    borderRadius: 16,
    height: 32,
    width: 32,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  calloutTitle: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  calloutDescription: {
    fontSize: 14
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: WHITE,
    height: SCREEN_HEIGHT / 4.5,
    borderColor: WHITE,
    borderRadius: 12,
    marginTop: SCREEN_HEIGHT / 3,
    marginLeft: SCREEN_WIDTH / 15
  },
  logo: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 8
  },
  menu: {
    marginRight: 36,
    paddingHorizontal: 4,
    borderRadius: 8,
    width: SCREEN_HEIGHT / 5 - 50
  },
  scrollView: {
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingLeft: 12,
    paddingRight: SCREEN_WIDTH - (SCREEN_HEIGHT / 4 - 50)
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignSelf: 'center'
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  emergencyButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: RED,
    paddingHorizontal: 8
  },
  reportIcon: {
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 4,
    marginRight: 8
  },
  searchContainer: {
    flex: 1
  },
  listSearch: {
    backgroundColor: WHITE_GREY_03,
    marginTop: 4,
    paddingVertical: 12,
    width: SCREEN_WIDTH * 0.8,
    alignSelf: 'center',
    borderRadius: 8
  },
  iconDinas: {
    height: 40,
    width: 40
  },
  text: {
    color: GREY,
    fontSize: 12
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: '100%',
    marginTop: 10,
    paddingBottom: -10,
    borderColor: BLACK
  },
  icon: {
    height: 33,
    width: 33,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 10
  },
  iconDesc: {
    borderWidth: 0.5,
    borderRadius: 17,
    borderColor: BLACK,
    height: 34,
    width: 34,
    marginTop: -10
  },
  userDesc: {
    width: '100%',
    paddingTop: 2,
    paddingBottom: -10,
    marginLeft: 10
  },
  textDesc: {
    color: BLACK,
    fontSize: 15,
    marginRight: 10,
    fontWeight: 'bold'
  }
})
