import { JOURNEY, AUTH } from './types';
import { GET, POST, PUT, DELETE } from './http.service';
import { API_URL } from '../env';

import { getCircles } from './circles';
import { getMyLeads } from './dashboard';

export function getDefaultCircles() {
	return (dispatch) => {
		fetch(API_URL+'api/circle/', {
			headers: {
				"Content-Type" : 'application/json',
				"Authorization": "Token " + window.localStorage.getItem('token')
			}
		}).then(res => {
			res.json().then(data => {
				dispatch({type: JOURNEY.GET_DEFAULT_CIRCLES, data: data})
			})
		})
	}
} 

export function addLead(lead, dispatch) {
	return (dispatch) => {
		POST('https://api.agentcloud.com/api/lead/', lead, header).then(res => {
			getMyLeads()(dispatch);
		});
	}
}

export function stepUpdate(percent) {
	return (dispatch) => {
		fetch(API_URL+'rest-auth/user/', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Token " + window.localStorage.getItem('token')
			},
			method: "PATCH",
			body: '{"profile_completeness": "'+percent+'","gmail":"'+gapi.auth2.getAuthInstance().currentUser.get().w3.U3+'"}'
		}).then(res => {
			res.json().then(data => {
				dispatch({type: AUTH.AUTH, user: data});
			})
		})
	}
}

export function addLeadsToCircle(data, dispatch) {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token')
	}
	for(let circle_id in data) {
		POST(API_URL+'api/circle/'+circle_id+'/add_lead/', data[circle_id], header).then(data => {
			getCircles(dispatch);
		})
	}
}