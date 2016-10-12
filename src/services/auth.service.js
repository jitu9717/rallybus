import {
	AsyncStorage
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import API from '../services/api.manager';
import EventService from '../services/events.service';

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
	try {
		return GoogleSignin.signOut()
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
	if (user) {
		console.log(user);

	await exports.writeUserToStorage(user);
	return user;
	}
	return new Error("Unable to login");
};