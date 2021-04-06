/* eslint react/display-name: "off" */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../../Presentational'
import { createMaterialTopTabNavigator } from 'react-navigation'
import { DARK_GREY, WHITE, WHITE_GREY_03 } from '../../Themes/Colors'
import MyEventReports from '../MyReport/MyEventReports'
import MyEmergencyReports from '../MyReport/MyEmergencyReports'
import { isIphoneX } from 'react-native-iphone-x-helper'

export default createMaterialTopTabNavigator(
  {
    MyEventReportScreen: {
      screen: MyEventReports,
      navigationOptions: {
        headerTitle: null,
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <Text description={!focused} style={styles.text}>
              Event
            </Text>
          </View>
        )
      }
    },
    MyEmergencyReportScreen: {
      screen: MyEmergencyReports,
      navigationOptions: {
        headerTitle: null,
        tabBarLabel: ({ focused }) => (
          <View style={{ marginTop: -25 }}>
            <Text description={!focused} style={styles.text}>
              Emergency
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
    tabBarPosition: 'top',
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
    navigationOptions: {
      title: 'Laporanku'
    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 2
  }
})
