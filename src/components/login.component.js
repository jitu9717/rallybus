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
import FBLoginView from './facebookButtonView.component';
import {loginUser,loginUserFacebook} from '../actions/api.actions';
import {setDefaultLoginButton} from '../actions/user.action';
let Icon = require('react-native-vector-icons/Ionicons');
let moment = require('moment');
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
let {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user : null
    };
      console.log("States ",this.state);
  }
  componentWillUnmount(){
    this.props.dispatch(setDefaultLoginButton());
      console.log("Component will Mount ",this.state);
  }
  render() {
    var _this = this;
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
        <View>
          <FBLogin style={{ marginBottom: 10, }}
                   facebookText={'Login with Facebook'}
                   ref={(fbLogin) => { this.fbLogin = fbLogin }}
                   permissions={["email","user_friends"]}
                   loginBehavior={FBLoginManager.LoginBehaviors.Native}
                   onLogin={async (data) => {console.log("LOGGEDIN ",data);
						let res = await this.props.dispatch(loginUserFacebook(data));
						if (!res.err) {
							this.props.goToRoute({
								replace: true,
								name: 'service',
								component: HomeComponent,
								title: 'Home'
							});
						}
					}}
                   onLogout={function(data){
                      console.log("Logged out.",data);
                      _this.setState({ user : null });
                    }}
                   onLoginFound={function(data){
                      console.log("Existing login found.");
                      console.log(data);
                      _this.setState({ user : null });
                   }}
                   onLoginNotFound={function(){
                      console.log("No user logged in.");
                      _this.setState({ user : null });
                   }}

                  onError={function(data){
                    console.log("ERROR");
                    console.log(data);
                  }}
                  onCancel={function(){
                    console.log("User cancelled.");
                  }}
                  onPermissionsMissing={function(data){
                    console.log("Check permissions!");
                    console.log(data);
                  }}
              />

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
