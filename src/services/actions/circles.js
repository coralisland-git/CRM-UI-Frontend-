import { CIRCLES } from './types';
import { GET, POST, PUT, DELETE } from './http.service';
import { API_URL } from '../env';
import { getLeadCircles } from './leads';

export const getCircles = (dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
  GET('https://api.agentcloud.com/api/circle/', header).then((data) => {
      dispatch({ type: CIRCLES.GET_ALL, circles: data})
  })
}

export const getCircle_leads = (circle_id, order_by, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
  GET(API_URL+'api/circle/'+circle_id+'/?order_by='+order_by, header).then((data) => {
      dispatch({ type: CIRCLES.GET_CIRCLE_LEADS, circle_leads: data})
  })
}

export const createCircles = (circle, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
	POST('https://api.agentcloud.com/api/circle/', circle, header).then(res => {
		getCircles(dispatch, header);
	});
}

export const addLeadToCircle = (circle_id, lead_id, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
	POST('https://api.agentcloud.com/api/circle/'+circle_id+'/add_lead/', lead_id, header).then(res => {
		getCircle_leads(circle_id, 'first_name', dispatch);
	});
}

export const updateCircles = (circle, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
	PUT('https://api.agentcloud.com/api/circle/'+circle.id+'/', circle, header).then(res => {
		getCircles(dispatch, header);
	});
}

export const deleteCircles = (circle, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
	DELETE('https://api.agentcloud.com/api/circle/'+circle.id, circle, header).then(res => {
		getCircles(dispatch, header);
	});
}

export const removeLeadFromCircle = (circle_id, lead_id, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
		}
	POST('https://api.agentcloud.com/api/circle/'+circle_id+'/delete_lead/', lead_id, header).then(res => {
		getLeadCircles(lead_id[0], dispatch);
	});
}