import { PureComponent } from 'react'
import { NetInfo } from 'react-native'

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') this.setState({ isConnected: false })
    })
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange)
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected })
    } else {
      this.setState({ isConnected })
    }
  }

  render() {
    return null
  }
}

export default OfflineNotice
