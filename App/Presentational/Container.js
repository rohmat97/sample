import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { CONTAINER_V2, CONTAINER_DARK } from '../Themes/ApplicationStyles'
import { Loader, RenderIf } from './'
import PropTypes from 'prop-types'

class Container extends PureComponent {
  render() {
    const { style, disabled, dark, children, loading, headerWONav } = this.props

    return (
      <View
        style={[dark ? styles.containerDark : styles.container, style, headerWONav ? style.headerWONav : null]}
        pointerEvents={disabled ? 'none' : 'auto'}
      >
        <RenderIf condition={!loading}>{children}</RenderIf>
        <Loader loading={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...CONTAINER_V2
  },
  containerDark: {
    ...CONTAINER_DARK
  }
})

Container.propTypes = {
  disabled: PropTypes.bool,
  dark: PropTypes.bool,
  loading: PropTypes.bool,
  style: PropTypes.object
}

Container.defaultProps = {
  disabled: false,
  dark: false,
  loading: false,
  style: {}
}

export default Container
