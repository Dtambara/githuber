import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {};

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  signin = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'User' }),
      ],
    });

    navigation.dispatch(resetAction);
  };

  render = () => (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Bem-Vindo</Text>
      <Text style={styles.text}>
        Para continuar, precisamos que você insira seu usuário no github.
      </Text>

      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Digite seu usuário"
          underlineColorAndroid="rgba(0,0,0,0)"
        />

        <TouchableOpacity style={styles.button} onPress={this.signin}>
          <Text style={styles.buttonText}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
