import { TASKS, LEADS, COMMON } from './types';
import { GET, POST, PUT, DELETE } from './http.service';
import { API_URL } from '../env';


export const getTasks = (dispatch) => {
	dispatch({ type: COMMON.SERVER_REQUEST}) 
	GET(API_URL+'api/task/').then((data) => {
		dispatch({ type: TASKS.GET_ALL, payload:{data: data}})
		dispatch({ type: COMMON.SERVER_SUCCESS}) 
	})
}

export const createTasks = (task, dispatch) => {
	POST(API_URL+'api/task/', task).then(res => {
		dispatch({ type: TASKS.CREATE, payload:{task: res}})
	});
}

export const updateTasks = (task, dispatch) => {
	PUT(API_URL+'api/task/'+task.id.toString()+'/',task).then(res => {
		dispatch({ type: TASKS.UPDATE, payload:{task: res}})
	});
}

export const completeTasks = (task, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token')
		}
	PUT(API_URL+'api/task/'+task.id.toString()+'/',task).then(res => {
		dispatch({ type: TASKS.UPDATE, payload:{task: res}})
	});
}

export const deleteTasks = (task, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token " + window.localStorage.getItem('token')
		}
	DELETE(API_URL+'api/task/'+task.id.toString(),task).then(res => {
		getTasks(dispatch)
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