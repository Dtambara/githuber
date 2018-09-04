import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from 'services/api';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    loading: false,
    errorMessage: null
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  }

  signin = async () => {
    this.setState({ loading: true });

    const { username } = this.state;
    const { navigation } = this.props;

    if (username.length === 0) return;

    try {
      await this.checkUserExists(username);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'User' }),
        ],
      });

      navigation.dispatch(resetAction);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Usuário não existe' });
    }
  };

  render = () => {
    const { username, loading, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Bem-Vindo</Text>
        <Text style={styles.text}>
          Para continuar, precisamos que você insira seu usuário no github.
        </Text>

        { !!errorMessage
            && <Text style={styles.error}>{errorMessage}</Text>
        }

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Digite seu usuário"
            underlineColorAndroid="rgba(0,0,0,0)"
            value={username}
            onChangeText={usernameInput => (this.setState({ username: usernameInput }))}
          />

          <TouchableOpacity style={styles.button} onPress={this.signin}>
            {
              loading
                ? <ActivityIndicator size="small" color="#FFF" />
                : <Text style={styles.buttonText}>Prosseguir</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}
