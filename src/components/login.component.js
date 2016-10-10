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
import {loginUser} from '../actions/api.actions';
let Icon = require('react-native-vector-icons/Ionicons');
let moment = require('moment');

export default class LoginComponent extends Component {
  render() {
    return (
      <View style={styles.container}>        
        <View style={styles.logoWrap}>
          <Image style={styles.logoImg} resizeMode='cover' source={require('../assets/pjohn-home-logo.png')} />
          <Text style={styles.logo}> Hostmaker </Text>
        </View>
        <TouchableNativeFeedback
          onPress={async () => {
						//var res = await this.props.dispatch(loginUser());if (!res.err) {
						if (true) {
							this.props.goToRoute({
								replace: true,
								name: 'service',
								component: ServiceComponent,
								title: moment(new Date()).format('Do MMMM')
							});
						}
					} }
        >
          <View style={[styles.button, styles.bigButton]}>
            {

                <ActivityIndicator color={'#fff'} size={'large'}></ActivityIndicator>
            }
          </View>
        </TouchableNativeFeedback>
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
    width: 320,
    height: 320
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
