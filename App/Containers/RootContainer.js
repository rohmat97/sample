import React, { Component } from 'react'
import { View, StatusBar, Platform, StyleSheet } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import codePush from 'react-native-code-push'
import config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import colors from '../Themes/Colors'

// Styles
// import styles from './Styles/RootContainerStyles'

const codePushOptions = {
  deploymentKey: Platform.OS === 'android' ? config.CODEPUSH_KEY_ANDROID : config.CODEPUSH_KEY_IOS,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
}

class RootContainer extends Component {
  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        <ReduxNavigation />
      </View>
    )
  }

  componentDidMount() {
    SplashScreen.hide()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }
}
const styles = StyleSheet.create({
  applicationView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background
  }
})

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(codePush(codePushOptions)(RootContainer))
