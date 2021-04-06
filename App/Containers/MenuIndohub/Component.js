import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Item, Text } from '../../Presentational'
import { MAROON, LIGHT_GREY } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'

export const ListMenu = ({ menu }) => (
  <FlatList
    data={menu}
    renderItem={({ item }) => (
      <View center style={styles.blok}>
        <Item plain style={styles.containerIconSelected}>
          <TouchableOpacity onPress={item.link}>
            <Item plain style={styles.box}>
              <Image source={item.image} style={styles.btnCategory} />
            </Item>
            <Text style={{ alignSelf: 'center', marginTop: -13 }}>{item.headline}</Text>
          </TouchableOpacity>
        </Item>
      </View>
    )}
    numColumns={3}
    keyExtractor={(item, index) => index.toString()}
  />
)

const styles = StyleSheet.create({
  blok: {
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_HEIGHT * 0.17,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerIconSelected: {
    height: 80,
    width: 80,
    flexDirection: 'column'
  },
  btnCategory: {
    height: 52,
    width: 60,
    alignSelf: 'center',
    margin: 15
  },
  box: {
    height: 80,
    width: 80,
    borderColor: LIGHT_GREY,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#f8f8f8',
    alignSelf: 'center',
    marginBottom: 20
  },
  buttonWrapStyle: {
    width: '100%',
    justifyContent: 'flex-end',
    margin: 0
  },
  buttonStyleNext: {
    height: 40,
    margin: 0,
    width: '100%',
    borderRadius: 0,
    backgroundColor: MAROON
  },
  buttonStylePick: {
    height: 40,
    margin: 0,
    width: '100%',
    borderRadius: 0,
    backgroundColor: LIGHT_GREY
  },
  textStyle: { fontSize: 14, margin: 0 }
})
