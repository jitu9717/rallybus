import {
	AsyncStorage
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import API from '../services/api.manager';
import EventService from '../services/events.service';
let {FBLogin, FBLoginManager,LoginManager} = require('react-native-facebook-login');


var env = require('../env');

exports.configure = function (callback) {
	return GoogleSignin.configure({
		offlineAccess: true,
		webClientId: env.google.clientId
	})
};

exports.writeTokenToStorage = async function(token) {
	await AsyncStorage.setItem('RALLYBUS:TOKEN', token);
}

exports.fetchTokenFromStorage = async function() {
	let token = await AsyncStorage.getItem('RALLYBUS:TOKEN');
	return token;
}

exports.removeTokenFromStorage = async function () {
	await AsyncStorage.removeItem('RALLYBUS:TOKEN');
};

exports.hasPlayServices = function (callback) {
	return GoogleSignin.hasPlayServices({ autoResolve: true })
};

exports.getCurrentUser = function (callback) {
	return GoogleSignin.currentUserAsync()
};

exports.login = function (callback) {
	return new Promise((resolve, reject) => {
		GoogleSignin.signIn()
			.then((user) => {
				resolve(user);
			})
			.catch((err) => {
				reject(err);
			})
			.done();
	})
};

exports.logout = async function (callback) {
	await exports.configure();
	await exports.removeUserFromStorage();
	await EventService.removeEventsFromStorage();
	await exports.removeTokenFromStorage();
	console.log("Log Out",callback);
	try {
		//return GoogleSignin.signOut();
		return LoginManager.logOut();
	} catch (err) {
		console.log("GoogleSignin Client not connected");
		return null;
	}
};

exports.writeUserToStorage = async function (user) {
	await AsyncStorage.setItem('RALLYBUS:USER', JSON.stringify(user));
};

exports.fetchUserFromStorage = async function () {
	let user = await AsyncStorage.getItem('RALLYBUS:USER');
	let token = await exports.fetchTokenFromStorage();
	try {
		user = JSON.parse(user);
		if (token) {
			console.log("::REHYDRATE-TOKEN", token);
			API.setToken(token);
		}
	} catch (err) {
		console.log("Unable to parse user", err);
	}
	return user;
};

exports.removeUserFromStorage = async function () {
	await AsyncStorage.removeItem('RALLYBUS:USER');
};

exports.signIn = async function (callback) {
	await exports.hasPlayServices();
	var c = await exports.configure();
	let user = await exports.fetchUserFromStorage();
	if (user) {
		return user;
	}

	user = await exports.login();
	console.log("UserInfo ",user);
	if (user) {
		let authUser = {};
		authUser.data ={};
		authUser.data.name = user.name;
		authUser.data.email = user.email;
		authUser.data.photo = user.photo;
		console.log("Auth User , ",authUser);
		await exports.writeUserToStorage(authUser);
		return authUser;
	}
	return new Error("Unable to login");
};


exports.signInFacebook = async function (userinfo) {
	let user = await exports.fetchUserFromStorage();
	if (user) {
		return user;
	}

	user = userinfo;
	if (user) {
		let authUser = {};
		authUser.data ={};
		authUser.data.name = user.profile.name;
		authUser.data.email = user.profile.email;
		authUser.data.photo = user.profile && user.profile.picture && user.profile.picture.data && user.profile.picture.data.url;
		console.log("Auth User , ",authUser);
		await exports.writeUserToStorage(authUser);
		return authUser;
	}
	return new Error("Unable to login");
};