import { LEADS, TEMPLATES, COMMON } from './types';
import { GET, POST, PUT, DELETE, PATCH } from './http.service';
import { API_URL } from '../env';
import { getTasks } from './tasks';

export const getTemplates = (dispatch) => {
	dispatch({ type: COMMON.SERVER_REQUEST}) 
	GET(API_URL+'api/template/').then((data) => {
		dispatch({ type: TEMPLATES.GET_ALL, payload:{templates: data}})
		dispatch({ type: COMMON.SERVER_SUCCESS}) 
	})
}

export const createTemplates = (template, dispatch) => {
	POST(API_URL+'api/template/', template).then(res => {
		dispatch({ type: TEMPLATES.CREATE, payload:{template: res}})
		getTasks(dispatch)
	});
}

export const updateTemplates = (template, dispatch) => {
	PUT(API_URL+'api/template/'+template.id.toString()+'/',template).then(res => {
		console.log('updateTemplates: ', res)

		dispatch({ type: TEMPLATES.UPDATE, payload:{template: res}})
	});
}

export const applyTemplates = (template, dispatch) => {
	// let template = Object.assign({}, newTemp);
	PATCH(API_URL+'api/template/'+template.id.toString()+'/', template).then(res => {
		console.log('****: ', res)

		dispatch({ type: TEMPLATES.PATCH, payload:{'template': res}})
	});
}

export const deleteTemplates = (template, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',	
		"Authorization": "Token " + window.localStorage.getItem('token')
		}
	DELETE(API_URL+'api/template/'+template.id.toString(),template, header).then(res => {
		getTemplates(dispatch);
	});
}

export const getLeadsByUser = (dispatch) => {
	let headers = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token')
		}
	let options = {
		method: 'GET',
		headers: headers
	}

	fetch('https://api.agentcloud.com/api/lead/', options).then((res) => {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}
		res.json().then((data) => {
			dispatch({ type: LEADS.GET_ALL, leads: data})
		})
		
	})
  
}