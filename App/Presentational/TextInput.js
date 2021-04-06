import React, { Component } from 'react'
import { TextField } from 'react-native-material-textfield'
import { GREY, BLACK, BLUE, LIGHT_GREY } from '../Themes/Colors'

export default class TextInput extends Component {
  render() {
    return (
      <TextField
        {...this.props}
        ref={(ref) => this.props.inputRef && this.props.inputRef(ref)}
        autoCorrect={false}
        baseColor={this.props.editable === false ? LIGHT_GREY : BLACK}
        tintColor={BLUE}
        textColor={this.props.editable === false ? GREY : BLACK}
        activeLineWidth={1}
        value={this.props.value || ''}
      />
    )
  }
}
