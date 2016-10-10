export const TOGGLE_NAVBAR_VISIBILITY = 'TOGGLE_NAVBAR_VISIBILITY';
export const INITIATE_USER_LOGIN = 'INITIATE_USER_LOGIN';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGOUT = 'USER_LOGOUT';

export * from './api.actions';

export function toggleNavbarVisibility(isVisible) {
	return {
		type: TOGGLE_NAVBAR_VISIBILITY,
		isVisible
	}
}

export function initiateUserLogin() {
	return {
		type: INITIATE_USER_LOGIN
	}
}

export function userLoginSuccess(user) {
	return {
		type: USER_LOGIN_SUCCESS,
		user
	}
}

export function userLoginFailed() {
	return {
		type: USER_LOGIN_FAILED
	}
}

export function userLogout() {
	return {
		type: USER_LOGOUT
	}
}