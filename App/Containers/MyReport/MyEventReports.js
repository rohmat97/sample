import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GetMyReportActions from '../../Redux/GetMyReportRedux'
import { ScrollView } from 'react-native'
import { Container } from '../../Presentational'
import { ListMyReport } from './Component'

function MyReport(props) {
  const { getMyReportRequest, myReportPayload, navigation } = props
  const { navigate } = navigation
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const moveToScrenDetailEvent = (myReport, isMove) => {
    if (!isMove)
      navigate('DetailEventScreen', {
        headline: myReport.headline,
        address: myReport.address,
        imagePost: myReport.imageUrl,
        description: myReport.description,
        userName: myReport.user.fullName,
        userImage: myReport.user.imageUrl,
        id: myReport.id
      })
  }

  useEffect(() => {
    getMyReportRequest()
  }, [])

  useEffect(() => {
    if (myReportPayload && myReportPayload.content) {
      setData(myReportPayload.content)
      setLoading(false)
    }
  }, [myReportPayload])

  return (
    <Container loading={loading}>
      <ScrollView>
        <ListMyReport data={data} moveToScrenDetailEvent={moveToScrenDetailEvent} />
      </ScrollView>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  myReportPayload: state.getMyReport.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(GetMyReportActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReport)
