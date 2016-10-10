var endpoint = process.env.ENDPOINT || 'http://localhost:4500';

import {writeTokenToStorage} from './auth.service';

var API = require('../env'),
	API_BASE = API.ENDPOINT.BASE;

function APIManager() {
	var token = null;
	this.hasToken = false;
	this.setToken = function (_token) {
		this.hasToken = true;
		token = _token;
	}
	this.getToken = function () {
		return token;
	}
}

APIManager.prototype.parseUrl = function (url, data) {
	var params = url.split("/:"),
		parsed = url;
	if (params && params.length) {
		parsed = params[0];
		for (let i = 1; i < params.length; i++) {
			if (data.hasOwnProperty(params[i])) {
				parsed += ("/" + data[params[i]]);
			}
		}
	}
	return parsed;
};

APIManager.prototype.request = async function (url, options = {}) {
	try {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};
		url = this.parseUrl(url, options);
		console.log("TOKEN:", this.getToken());
		if (this.hasToken) {
			headers["Authorization"] = "Bearer " + this.getToken();
		}

		let reqBody = {
			method: options.method || "POST",
			headers: headers
		};

		if(options.method.toLowerCase() !== 'get') {
			reqBody['body'] = JSON.stringify(options.payload || {})
		}
		let response = await fetch(url, reqBody);

		// Update token based on response headers
		let authHeader = response.headers.get('authorization');
		if(authHeader) {
			let token = authHeader.split(' ')[1];
			this.setToken(token);
			await writeTokenToStorage(token);
		}
		console.log("<< RESP TOKEN::", authHeader, response.headers.get('status'));
		return response;
	} catch (error) {
		console.error(error);
	}
};

APIManager.prototype.login = async function (options) {
	try {
		var {url, method} = API.ENDPOINT.AUTH.CREATE;
		console.log(">>>>>login API request", url, method, options, API_BASE);

		options.method = method;

		let response = await this.request(API_BASE + url, options);
		let responseJson = await response.json();
		if (responseJson && responseJson.data && responseJson.data.attributes) {
			this.setToken(responseJson.data.attributes['api-access-token']);
		}
		return responseJson;
	} catch (e) {
		console.error(e);
		return {};
	}
};

APIManager.prototype.userEvents = async function (options = {}) {
	try {
		var {url, method} = API.ENDPOINT.USER.EVENTS;
		options.method = method;
		let response = await this.request(API_BASE + url + "?days_ago=1", options);
		console.log(">>>>>Service events API request", url, method, options, API_BASE);
		let userResponseJson = await response.json();
		if(userResponseJson.error) {
			return {};
		}
		return userResponseJson;
	} catch (e) {
		console.error(e);
		return {};
	}
};




const Manager = new APIManager();

module.exports = Manager;