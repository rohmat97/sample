import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Images } from '../../Themes'
import { RED, MAROON } from '../../Themes/Colors'
import { Item, Text, Button, Footer } from '../../Presentational'

export const RegisterInvitation = ({ setShow }) => {
  return (
    <Item plain style={styles.container}>
      <Item plain style={styles.containerLogo}>
        <Text center bold style={styles.txtRegisterInvitation}>
          Yuk, Register dulu!
        </Text>
        <Image source={Images.ic_reggowes} style={styles.logo} />
        <Text center style={styles.txtRegisterInvitationDesc}>
          Untuk bergabung di Gowes HUB, anda harus melakukan registrasi terlebih dulu. Yuk Registrasi sekarang!
        </Text>
        <Item center style={{ marginHorizontal: 80 }}>
          <Item plain style={{ width: '100%' }}>
            <Button
              uppercase
              fetch
              onPress={() => {
                setShow(true)
              }}
              containerStyle={styles.btnRegisterInvitation}
              textStyle={{ fontSize: 14, margin: 0 }}
            >
              REGISTER GOWES HUB
            </Button>
          </Item>
        </Item>
      </Item>
    </Item>
  )
}

export const RegisterDone = () => {
  return (
    <Item plain style={styles.container}>
      <Item plain style={styles.containerLogo}>
        <Text center bold style={styles.txtRegisterDone}>
          Terimakasih telah mendaftar!
        </Text>
        <Image source={Images.ic_reggowes} style={styles.logo} />
        <Text center style={styles.txtRegisterDoneDesc}>
          Anda telah mendaftar untuk menggunakan fitur Gowes HUB! Mohon tunggu proses selanjutnya, Terimakasih!
        </Text>
      </Item>
    </Item>
  )
}

export const IconChat = ({ navigate }) => {
  return (
    <Footer borderWidth={0} backgroundColor={'transparent'} style={{ marginBottom: '20%' }}>
      <TouchableOpacity style={styles.chatIcon} onPress={() => navigate('GowesHubChatScreen')}>
        <Image source={Images.ic_chat} />
      </TouchableOpacity>
    </Footer>
  )
}

export const SetMarker = (kategori) => {
  switch (kategori) {
    case 'Anak Laki-laki':
      return Images.ic_anak_laki
    case 'Anak Perempuan':
      return Images.ic_anak_perempuan
    case 'Remaja Laki-laki':
      return Images.ic_remaja_laki
    case 'Remaja Perempuan':
      return Images.ic_remaja_perempuan
    case 'Dewasa Laki-laki':
      return Images.ic_dewasa_laki
    case 'Dewasa Perempuan':
      return Images.ic_dewasa_perempuan
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  containerLogo: {
    marginTop: '20%'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  txtRegisterInvitation: {
    fontSize: 20,
    color: RED,
    marginHorizontal: 20,
    marginVertical: 10
  },
  txtRegisterInvitationDesc: {
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 10
  },
  btnRegisterInvitation: {
    height: 40,
    margin: 0,
    backgroundColor: MAROON
  },
  txtRegisterDone: {
    fontSize: 20,
    color: RED,
    marginHorizontal: 20,
    marginVertical: 10
  },
  txtRegisterDoneDesc: {
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 10
  },
  chatIcon: {
    resizeMode: 'contain',
    alignSelf: 'flex-end'
  }
})
