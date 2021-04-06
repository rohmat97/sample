import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GetMyEmergencyReportActions from '../../Redux/GetMyEmergencyReportRedux'
import { ScrollView } from 'react-native'
import { Container } from '../../Presentational'
import { ListMyEmergencyReport } from './Component'

function MyEmergencyReport(props) {
  const { getMyEmergencyReportRequest, myEmergencyReportPayload, navigation } = props
  const { navigate } = navigation
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const moveToScrenDetailEmergency = (myEmergencyReport, isMove) => {
    if (!isMove)
      navigate('DetailEmergencyScreen', {
        headline: myEmergencyReport.categoryVictimReport,
        address: myEmergencyReport.address,
        imagePost: myEmergencyReport.imageUrl,
        description: myEmergencyReport.locationDetail,
        userName: myEmergencyReport.user.fullName,
        userImage: myEmergencyReport.user.imageUrl,
        id: myEmergencyReport.id
      })
  }

  useEffect(() => {
    getMyEmergencyReportRequest()
  }, [])

  useEffect(() => {
    if (myEmergencyReportPayload && myEmergencyReportPayload.content) {
      setData(myEmergencyReportPayload.content)
      setLoading(false)
    }
  }, [myEmergencyReportPayload])

  return (
    <Container loading={loading}>
      <ScrollView>
        <ListMyEmergencyReport data={data} moveToScrenDetailEmergency={moveToScrenDetailEmergency} />
      </ScrollView>
    </Container>
  )
}

MyEmergencyReport.navigationOptions = () => ({
  title: 'Laporanku'
})

const mapStateToProps = (state) => ({
  myEmergencyReportPayload: state.getMyEmergencyReport.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(GetMyEmergencyReportActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEmergencyReport)
