import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from './Offline/Container'

class NetworkListener extends Component {
  renderContent = () => {
    const { children, isConnected } = this.props

    if (isConnected) {
      return children
    }

    return <Container />
  }
  render() {
    return this.renderContent()
  }
}

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected
})

export default connect(mapStateToProps)(NetworkListener)
