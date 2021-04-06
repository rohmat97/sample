import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Images } from '../../Themes'
import { Item, Container } from '../../Presentational'
import { MAROON, LIGHT_GREY } from '../../Themes/Colors'
import { SCREEN_HEIGHT } from '../../Themes/Metrics'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { ListCategory, FixBottomButton } from './Component'

function Category(props) {
  const { navigation } = props
  const { navigate } = navigation
  const [kategori] = useState([
    { headline: 'Banjir', image: Images.ic_banjir },
    { headline: 'Angin Puting Beliung', image: Images.ic_puting_beliung },
    { headline: 'Longsor', image: Images.ic_longsor },
    { headline: 'Tsunami', image: Images.ic_tsunami },
    { headline: 'Gempa', image: Images.ic_gempa },
    { headline: 'Gunung Meletus', image: Images.ic_gunung_meletus },
    { headline: 'Tawuran', image: Images.ic_tawuran },
    { headline: 'Tabrakan', image: Images.ic_tabrakan },
    { headline: 'Macet', image: Images.ic_macet },
    { headline: 'Acara Warga', image: Images.ic_acara },
    { headline: 'Sampah Menumpuk', image: Images.ic_sampah },
    { headline: 'Lainnya', image: Images.ic_lainnya }
  ])
  const [pressedButton, setPressedButton] = useState('')
  const moveToScreenReport = (kategori) => {
    navigate('ReportScreen', { headline: kategori })
  }

  return (
    <Container>
      <ScrollView>
        <Item plain style={styles.container}>
          <ListCategory kategori={kategori} setPressedButton={setPressedButton} pressedButton={pressedButton} />
        </Item>
      </ScrollView>
      <FixBottomButton pressedButton={pressedButton} moveToScreenReport={moveToScreenReport} />
    </Container>
  )
}

Category.navigationOptions = ({ navigation }) => ({
  title: 'Kategori - Buat Laporan'
})

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    justifyContent: 'space-between'
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
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  textStyle: { fontSize: 14, margin: 0 }
})

export default connect(null, null)(Category)
