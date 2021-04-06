import React from 'react'
import { Image, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Item, Text, Footer, Button } from '../../Presentational'
import { WHITE, GREY, MAROON, LIGHT_GREY } from '../../Themes/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Themes/Metrics'

export const ListCategory = ({ kategori, pressedButton, setPressedButton }) => (
  <FlatList
    refreshing={pressedButton}
    data={kategori}
    renderItem={({ item }) => (
      <View style={styles.blok}>
        {pressedButton === item.headline ? (
          <TouchableOpacity
            onPress={() => {
              setPressedButton(item.headline)
            }}
          >
            <Item plain style={styles.containerIconSelected}>
              <Image source={item.image} style={styles.btnCategory} />
              <Text bold numberOfLines={1} style={{ alignSelf: 'center' }}>
                {item.headline}
              </Text>
            </Item>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setPressedButton(item.headline)
            }}
          >
            <Item plain style={styles.containerIcon}>
              <Image source={item.image} style={styles.btnCategory} />
              <Text bold numberOfLines={1} style={{ alignSelf: 'center' }}>
                {item.headline}
              </Text>
            </Item>
          </TouchableOpacity>
        )}
      </View>
    )}
    numColumns={3}
    keyExtractor={(item, index) => index.toString()}
  />
)

export const FixBottomButton = ({ pressedButton, moveToScreenReport }) => (
  <Footer borderWidth={0} backgroundColor={'transparent'}>
    <Item plain style={styles.buttonWrapStyle}>
      {pressedButton ? (
        <Button
          secondary
          uppercase
          containerStyle={styles.buttonStyleNext}
          textStyle={styles.textStyle}
          onPress={() => moveToScreenReport(pressedButton)}
        >
          Pilih & Lanjutkan
        </Button>
      ) : (
        <Button
          secondary
          uppercase
          containerStyle={styles.buttonStylePick}
          textStyle={styles.textStyle}
          onPress={() => alert('Mohon pilih kategori laporan terlebih dahulu')}
        >
          Pilih
        </Button>
      )}
    </Item>
  </Footer>
)

const styles = StyleSheet.create({
  blok: {
    width: SCREEN_WIDTH * 0.33,
    height: SCREEN_HEIGHT * 0.18,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  containerIcon: {
    width: SCREEN_WIDTH * 0.33,
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: WHITE,
    flexDirection: 'column'
  },
  containerIconSelected: {
    width: SCREEN_WIDTH * 0.33,
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: GREY,
    flexDirection: 'column'
  },
  btnCategory: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
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
