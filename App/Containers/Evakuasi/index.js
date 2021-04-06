import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import EvacuationByIdReduxActions from '../../Redux/EvacuationByIdRedux'
import EvacuationMessageAction from '../../Redux/EvacuationMessageRedux'
import { Container } from '../../Presentational'
import { RenderEvakusiSite, RenderGambar, RenderPengungsi, RenderButton } from './Component'

function TitikEvakuasi(props) {
  const { navigation, dataEvakuasi, evacuationByIdRequest, evacuationMessageRequest, dataMessage } = props
  const { title, id, category, coordinate, address } = navigation.state.params
  const { navigate } = navigation
  const [status, setstatus] = useState(true)

  useEffect(() => {
    evacuationByIdRequest({ id: id })
    evacuationMessageRequest({ EvacuationSiteId: id })
  }, [])

  useEffect(() => {
    if (dataEvakuasi && dataMessage) {
      setstatus(false)
    }
  }, [dataEvakuasi, dataMessage])

  const moveToCommentEmergency = (isMove) => {
    if (!isMove)
      navigate('CommentEmergencyScreen', {
        title: title,
        id: id,
        category: category,
        coordinate: coordinate,
        address: address
      })
  }

  // useEffect(() => {
  //   if (dataMessage) {
  //     console.log('evakuasi' + JSON.stringify(dataMessage) + ' \n ' + JSON.stringify(dataEvakuasi))
  //   }
  // }, [dataMessage])
  return (
    <ScrollView>
      <Container loading={status} style={{ justifyContent: 'space-around', flex: 1 }}>
        <RenderEvakusiSite dataEvakuasi={dataEvakuasi} />
        <RenderPengungsi dataEvakuasi={dataEvakuasi} />
        <RenderGambar
          dataEvakuasi={dataEvakuasi}
          menuMarker={
            dataMessage
              ? dataMessage.length > 0
                ? dataMessage
                : [
                    {
                      id: 1,
                      title: '1 Place',
                      description: 'Saat ini belum ada info lebih lanjut dari pihak BPBD'
                    }
                  ]
              : [
                  {
                    id: 1,
                    title: '1 Place',
                    description: 'Saat ini belum ada info lebih lanjut dari pihak BPBD'
                  }
                ]
          }
          navigate={navigate}
        />
        <RenderButton moveToCommentEmergency={moveToCommentEmergency} />
      </Container>
    </ScrollView>
  )
}

TitikEvakuasi.navigationOptions = () => ({
  headerTitle: 'Titik Evakuasi'
})

const mapStateToProps = (state) => ({
  dataEvakuasi: state.EvacuationById.payload,
  dataMessage: state.evacuationMessageId.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(EvacuationByIdReduxActions, EvacuationMessageAction), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TitikEvakuasi)
