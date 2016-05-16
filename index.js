'use strict'

import React, {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
  button: {
    padding: 10,
    height: 40,
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
})

export default class Button extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: Text.propTypes.style,
  };

  render() {
    const { text, onPress, style } = this.props

    return (
      <TouchableHighlight
        onPress={onPress}
        style={[styles.button, style]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    )
  }

}
