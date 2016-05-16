'use strict'

import React, {
  PropTypes,
  Text,
  TouchableHighlight,
} from 'react-native'
import styles from '../lib/styles'

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
