import { INTERACTIONS, COMMON } from './types';
import { GET, POST, PUT, DELETE } from './http.service';
import { API_URL } from '../env';

export const getInteractions = (filters) => {
	return dispatch => {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token "+ window.localStorage.getItem('token')
		}

		dispatch({ type: COMMON.SERVER_REQUEST})
		let queryStr = '?';
		if(filters.lead_id)
			queryStr +=`lead=${filters.lead_id}&`;
		if(filters.type)
			queryStr +=`type=${filters.type}&`;
		if(filters.fromDate && filters.toDate) {
			queryStr += `from=${moment(filters.fromDate).format('YYYY-MM-DD')}&`;
			queryStr += `to=${moment(filters.toDate).format('YYYY-MM-DD')}&`;
		}

	  	return GET(API_URL+'api/interaction/'+queryStr, header).then((data) => {
	      	// dispatch({ type: INTERACTIONS.FILTER, interactions: data})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	      	return data;
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})
	}
}

export const createInteractions = (interaction) => {

	return dispatch => {
		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token "+ window.localStorage.getItem('token')
		}

		dispatch({ type: COMMON.SERVER_REQUEST})
		let data = {...interaction, due_date: moment(interaction.due_date).format('YYYY-MM-DD')};
	  	return POST('https://api.agentcloud.com/api/interaction/', data, header).then(res => {
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	  	}).catch((err)=>{
	  		console.log(err);
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})
	}
}

// export const updateInteractions = (interaction, dispatch) => {
// 	let header = {
// 	"Content-Type" : 'application/json',
// 	"Authorization": "Token "+ window.localStorage.getItem('token')
// 	}
// 	PUT('https://api.agentcloud.com/api/interaction/'+interaction.id.toString()+'/',interaction, header).then(res => {
// 		getInteractions(dispatch, header);
// 	});
// }

// export const deleteInteractions = (interaction, dispatch) => {
// 	let header = {
// 	"Content-Type" : 'application/json',
// 	"Authorization": "Token "+ window.localStorage.getItem('token')
// 	}
// 	DELETE('https://api.agentcloud.com/api/interaction/'+interaction.id.toString(),interaction, header).then(res => {
// 		getInteractions(dispatch, header);
// 	});
// }
