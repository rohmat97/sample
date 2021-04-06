import React from 'react'
import PropTypes from 'prop-types'
import Text from './Text'
import { WHITE, ORANGE } from '../Themes/Colors'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

const transparent = 'transparent'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparent,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 70,
    height: 50,
    color: WHITE
  },
  activityIndicator: {
    flex: 1
  }
})

const ANIMATION = ['none', 'slide', 'fade']
const SIZES = ['small', 'normal', 'large']

export default class Spinner extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.loading,
      textContent: this.props.textContent
    }
  }

  static propTypes = {
    cancelable: PropTypes.bool,
    color: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    overlayColor: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    loading: PropTypes.bool,
    indicatorStyle: PropTypes.object,
    customIndicator: PropTypes.element,
    children: PropTypes.element
  }

  static defaultProps = {
    loading: false,
    cancelable: false,
    animation: 'slide',
    color: ORANGE,
    size: 'large'
  }

  close() {
    this.setState({ loading: false })
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {}
    if (state.loading !== props.loading) newState.loading = props.loading
    if (state.textContent !== props.textContent) newState.textContent = props.textContent
    return newState
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close()
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        {this.props.customIndicator ? (
          this.props.customIndicator
        ) : (
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={[styles.activityIndicator, { ...this.props.indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
          <Text style={[styles.textContent, this.props.textStyle]}>{this.state.textContent}</Text>
        </View>
      </View>
    )
  }

  _renderSpinner() {
    if (!this.state.loading) return null

    const spinner = (
      <View style={[styles.container, { backgroundColor: this.props.overlayColor }]} key={`spinner_${Date.now()}`}>
        {this.props.children ? this.props.children : this._renderDefaultContent()}
      </View>
    )

    return spinner
  }

  render() {
    return this._renderSpinner()
  }
}
