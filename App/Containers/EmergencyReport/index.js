import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ScrollView } from 'react-native'
import { Container } from '../../Presentational'
import { getFileName } from '../../Transforms/Common'
import TokenizerActions from '../../Redux/TokenizerRedux'
import CreateEmergencyReportActions from '../../Redux/CreateEmergencyReportRedux'
import TenantActions from '../../Redux/TenantRedux'
import { FormLaporan } from './Component'

function EmergencyReport(props) {
  const { token, tokenAPIPayload, tenantRequest, navigation, createEmergencyReportRequest, fetching } = props
  const { navigate, pop } = navigation
  const { headline } = navigation.state.params
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [locationDetail, setlocationDetail] = useState('')
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    if (token && tokenAPIPayload) {
      tenantRequest()
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    })
  }, [])

  const sendReport = () => {
    if (photo === null) {
      alert('Mohon ambil foto terlebih dahulu')
    } else if (locationDetail === '') {
      alert('Mohon isi keterangan terlebih dahulu')
    } else createEmergencyReportRequest({ locationDetail, latitude, longitude, image: photo, headline })
  }

  const pickAnImageHandler = () => {
    const { navigate } = props.navigation
    navigate('TakePhotoScreen', { facing: 'back', borderType: 'none', source: setImage })
  }

  const setImage = (imageUri) => {
    setPhoto({
      uri: imageUri,
      static: true,
      type: 'image/jpeg',
      name: getFileName(imageUri)
    })
  }

  const removePhoto = () => {
    setPhoto(null)
  }

  return (
    <Container>
      <ScrollView>
        <FormLaporan
          photo={photo}
          pickAnImageHandler={pickAnImageHandler}
          removePhoto={removePhoto}
          locationDetail={locationDetail}
          setlocationDetail={setlocationDetail}
          token={token}
          pop={pop}
          sendReport={sendReport}
          navigate={navigate}
          fetching={fetching}
        />
      </ScrollView>
    </Container>
  )
}

EmergencyReport.navigationOptions = () => ({
  title: 'Buat Laporan Darurat'
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  tokenAPIPayload: state.tokenAPI.payload,
  tenant: state.tenant.payload,
  tenantPayload: state.tenant.payload,
  fetching: state.createEmergencyReport.fetching,
  success: state.createEmergencyReport.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, TenantActions, CreateEmergencyReportActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyReport)
