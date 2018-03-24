import { AUTH } from './types';
import { API_URL } from '../env';

export function auth(token, dispatch) {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + token
	}
	return fetch(API_URL+'rest-auth/user/', { method: 'get', headers: header })
	.then(response => {
		return response.json();
	})
	.then(data => {
		if(data.id) {
			dispatch({type: AUTH.AUTH, user: data});
			window.localStorage.setItem('token', token);
			return data;
		}
		else {
			window.localStorage.removeItem('token');
			window.location.href = "http://agentcloud.com/wp-login.php?action=logout&redirect_to=http://agentcloud.com";
			throw new Error('Not Authenticated');
		}

	})
}

export function logOut() {
	window.localStorage.removeItem('token');
	window.location.href = "http://agentcloud.com/wp-login.php?action=logout&redirect_to=http://agentcloud.com";
}
