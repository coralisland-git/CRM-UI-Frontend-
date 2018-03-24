import { LEADS, AUTH } from './types';

import { API_URL } from '../env';

console.log("LOCALSTORAGE  ", window.localStorage.getItem('token'));

export function getMyLeads() {
	return (dispatch, getState) => {
		const token = window.localStorage.getItem('token');
		fetch(API_URL+'api/lead/', {
			headers: {
				"Content-Type" : 'application/json',
				'Authorization': 'Token ' + window.localStorage.getItem('token')
			}
		}).then(res => {
			res.json().then(data => {
				dispatch({ type: LEADS.GET_ALL, leads: data})
			});
		})
	}
}

export function updateLeads(lead) {
	return (dispatch, getState) => {
		fetch(API_URL+'api/lead/'+lead.id+'/', {
			method: 'PATCH',
			headers: {
				"Content-Type" : 'application/json',
				'Authorization': 'Token ' + window.localStorage.getItem('token')
			}, 
			body: JSON.stringify(lead)
		}).then(res => {
			res.json().then(data => {
				fetch(API_URL+'api/lead/', {
					headers: {
						"Content-Type" : 'application/json',
						'Authorization': 'Token ' + window.localStorage.getItem('token')
					}
				}).then(res => {
					res.json().then(data => {
						dispatch({ type: LEADS.GET_ALL, leads: data})
					});
				})
			})
		})
	}
}

export function completeJourney() {
	return(dispatch) => {
		fetch(API_URL+'rest-auth/user/', {
			method: 'PATCH', 
			body: JSON.stringify({"is_first": false}),
			headers: {
				"Content-Type" : 'application/json',
				'Authorization': 'Token ' + window.localStorage.getItem('token')
			}
		}).then(res => {
			res.json().then(data => {
				console.log(data);
				dispatch({type: AUTH.AUTH, user: data});
			})
		})
	}
}
