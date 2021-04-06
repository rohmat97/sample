import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import VersionActions from '../../Redux/VersionRedux'
import TokenizerActions from '../../Redux/TokenizerRedux'
import { Container } from '../../Presentational'
import { AboutUsBox, AboutUsFooter } from './Component'

function AboutUs(props) {
  const { token, versionPayload, versionRequest } = props
  const [version, setVersion] = useState([])

  useEffect(() => {
    if (token) {
      versionRequest()
    }
  }, [])

  useEffect(() => {
    if (versionPayload) {
      setVersion(versionPayload.content)
    }
  }, [versionPayload])

  return (
    <Container>
      <AboutUsBox />
      <AboutUsFooter version={version} />
    </Container>
  )
}

AboutUs.navigationOptions = () => ({
  title: 'Tentang Kami'
})

const mapStateToProps = (state) => ({
  token: state.tokenizer.token,
  versionPayload: state.version.payload
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(TokenizerActions, VersionActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)
