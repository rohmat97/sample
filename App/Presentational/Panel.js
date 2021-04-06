import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight, Animated } from 'react-native'
import { RenderIf, Item, Icon, Text } from '.'
import { WHITE_GREY_02 } from '../Themes/Colors'

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(30)
    }
  }

  toggle() {
    const { expanded, maxHeight, minHeight, animation } = this.state
    let initialValue = expanded ? maxHeight + minHeight + 6 : minHeight - 6

    let finalValue = expanded ? minHeight - 6 : maxHeight + minHeight + 6

    this.setState({
      expanded: !expanded
    })

    animation.setValue(initialValue)
    Animated.spring(animation, {
      toValue: finalValue
    }).start()
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    })
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height
    })
  }

  render() {
    const { title, expanded, animation } = this.state
    const { children, style, icon } = this.props

    return (
      <Animated.View style={[styles.container, { height: animation }, style]}>
        <TouchableHighlight onPress={this.toggle.bind(this)} underlayColor="#f1f1f1">
          <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
            <Item spaceBetween center plain row>
              <Item plain center row>
                <Item plain style={{ width: 32 }}>
                  <RenderIf condition={icon}>
                    <Icon name={icon} size={16} style={{ paddingHorizontal: 8 }} />
                  </RenderIf>
                </Item>
                <Item plain>
                  <Text style={styles.title}>{title}</Text>
                </Item>
              </Item>
              <Item plain>
                <RenderIf condition={expanded}>
                  <Icon name="chevron-up" size={12} style={{ paddingHorizontal: 8 }} />
                </RenderIf>
                <RenderIf condition={!expanded}>
                  <Icon name="chevron-down" size={12} style={{ paddingHorizontal: 8 }} />
                </RenderIf>
              </Item>
            </Item>
          </View>
        </TouchableHighlight>

        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {children}
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  titleContainer: {
    paddingVertical: 4
  },
  title: {
    paddingHorizontal: 4
  },
  body: {
    backgroundColor: WHITE_GREY_02
  }
})

export default Panel
