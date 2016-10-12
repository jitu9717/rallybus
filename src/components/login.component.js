import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';

import ServiceComponent from './../containers/service.container.js';
import HomeComponent from './home.component';
import {loginUser} from '../actions/api.actions';
let Icon = require('react-native-vector-icons/Ionicons');
let moment = require('moment');
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class LoginComponent extends Component {
  render() {
    return (
      <View style={styles.container}>        
        <View style={styles.logoWrap}>
          <Image style={styles.logoImg} resizeMode='cover' source={require('../assets/rally-bus.jpg')} />
          <Text style={styles.logo}> Rally Bus </Text>
        </View>


        <View>
          <GoogleSigninButton
              style={{width: 312, height: 48, marginLeft:25}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              value = 'signin'
              onPress={async () => {
						var res = await this.props.dispatch(loginUser());

						if (!res.err) {
							this.props.goToRoute({
								replace: true,
								name: 'service',
								component: HomeComponent,
								title: 'Home'
							});
						}
					}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif-light'
  },
  logoImg: {
    width: 200,
    height: 200
  },
  bigButton: {
    backgroundColor: '#d34836',
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10
  },
  googleText: {
    color: '#fff',
    fontSize: 20
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
});
