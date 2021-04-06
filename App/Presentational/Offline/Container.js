import React, { Component } from 'react'
import { Section, Item, Text } from '../'
import { PADDING_HORIZONTAL_25 } from '../../Themes/ApplicationStyles'

class ContainerOffline extends Component {
  render() {
    return (
      <Item flex style={{ justifyContent: 'center' }}>
        <Section>
          <Item small center>
            <Text large bold>
              Sepertinya anda sedang offline
            </Text>
          </Item>
          <Item center small style={PADDING_HORIZONTAL_25}>
            <Text description style={styles.text}>
              Coba periksa Koneksi Wi-Fi atau data selular dan coba kembali.
            </Text>
          </Item>
        </Section>
      </Item>
    )
  }
}

const styles = {
  text: {
    textAlign: 'center'
  }
}

export default ContainerOffline
