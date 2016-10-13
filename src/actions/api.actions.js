import * as actions from './index';
import { signIn, logout, signInFacebook } from '../services/auth.service';
import { fetchEvents} from '../services/events.service';
import {
	fetchServiceListFailure,
	fetchServiceListSuccess,
	initiateFetchServiceList,
	initiateStartService,
	startServiceSuccess,
	startServiceFailure,
	initiateEndService,
	endServiceSuccess,
	endServiceFailure
} from './service.action';

export function loginUser() {
	return async (dispatch, getState) => {
		dispatch(actions.initiateUserLogin());

		try {
			let user = await signIn();
			console.log("Signin ",user);
			if (user) {
				dispatch(actions.userLoginSuccess(user));
				return {
					err: false,
					user
				};
			}
			console.log("SIGNIN: NO USER", user);
			dispatch(actions.userLoginFailed());
			return {
				err: true
			};
		} catch (err) {
			console.log("SIGNIN: ERROR", err);
			dispatch(actions.userLoginFailed());
			return {
				err: true
			};
		}
	}
}

export function loginUserFacebook(userinfo) {
	return async (dispatch, getState) => {
		dispatch(actions.initiateUserLogin());

		try {
			let user = await signInFacebook(userinfo);
			if (user) {
				dispatch(actions.userLoginSuccess(user));
				return {
					err: false,
					user
				};
			}
			console.log("SIGNIN: NO USER", user);
			dispatch(actions.userLoginFailed());
			return {
				err: true
			};
		} catch (err) {
			console.log("SIGNIN: ERROR", err);
			dispatch(actions.userLoginFailed());
			return {
				err: true
			};
		}
	}
}

export function logoutUser() {
	return async (dispatch, getState) => {
		try {
			await logout();
		} catch (err) {
			console.log("User logout error", err);
		}
		return dispatch(actions.userLogout());
	}
}


export function fetchUserService() {
	return async (dispatch, getState) => {
		dispatch(initiateFetchServiceList());

		try {
			let response = await fetchEvents();
			if (response) {
				dispatch(fetchServiceListSuccess(response));
				return {
					err: false,
					service: response
				};
			}
			dispatch(fetchServiceListFailure({}));
			return {
				err: false,
				service: []
			};
		} catch (err) {
			console.log("Error fetching service list", err);
			dispatch(fetchServiceListFailure(err));
			return {
				err: true,
				error: err
			};
		}
	}
}

