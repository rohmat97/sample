/* eslint react/display-name: "off" */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Icon } from '../../Presentational'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { DARK_GREY, WHITE, WHITE_GREY_03 } from '../../Themes/Colors'
import CCTV from '../CCTV'
// next feature
// import GowesHubReg from '../GowesHub/Register'
// import GowesHub from '../GowesHub'
// import Explorer from '../Explorer'
import Notification from '../Notification'
import Profile from '../Profile'
import MenuIndoHUB from '../MenuIndohub'
import { isIphoneX } from 'react-native-iphone-x-helper'

const IconNav = ({ focused, source }) => {
  const color = focused ? 'maroon' : 'grey'
  const size = focused ? 24 : 20
  return <Icon name={source} size={size} color={color} style={{ alignSelf: 'center' }} />
}

export default createMaterialTopTabNavigator(
  {
    HomeScreen: {
      screen: CCTV,
      navigationOptions: {
        headerTitle: null,
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <IconNav focused={focused} source={'view-dashboard'} />
            <Text description={!focused} style={styles.text}>
              Beranda
            </Text>
          </View>
        )
      }
    },
    IndohubScreen: {
      screen: MenuIndoHUB,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <IconNav focused={focused} source={'star'} />
            <Text description={!focused} style={styles.text}>
              Indohub
            </Text>
          </View>
        )
      }
    },
    // ExplorerScreen: {
    //   screen: Explorer,
    //   navigationOptions: {
    //     tabBarLabel: ({ focused }) => (
    //       <View style={{ marginTop: -25 }}>
    //         <IconNav focused={focused} source={'format-list-bulleted'} />
    //         <Text description={!focused} style={styles.text}>
    //           Timeline
    //         </Text>
    //       </View>
    //     )
    //   }
    // },
    NotificationScreen: {
      screen: Notification,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <IconNav focused={focused} source={'bell-ring'} />
            <Text description={!focused} style={styles.text}>
              Notifikasi
            </Text>
          </View>
        )
      }
    },
    ProfileScreen: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <IconNav focused={focused} source={'clipboard-account'} />
            <Text description={!focused} style={styles.text}>
              Profil
            </Text>
          </View>
        )
      }
    }
  },
  {
    lazy: true,
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: DARK_GREY,
      style: {
        borderTopWidth: 1,
        borderTopColor: WHITE_GREY_03,
        backgroundColor: WHITE,
        elevation: 0,
        height: 55,
        marginBottom: isIphoneX() ? 18 : 0
      },
      indicatorStyle: {
        borderBottomWidth: 3
      }
    },
    iconStyle: {
      width: 30,
      height: 30
    },
    navigationOptions: {
      header: null
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 10.5,
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 2
  }
})
