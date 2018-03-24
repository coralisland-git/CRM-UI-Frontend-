// import { USERS, COMMON } from './types';
// import { GET, POST, PUT, DELETE,PATCH } from './http.service';
// import { API_URL } from '../env';

// import { showLoading, hideLoading } from 'react-redux-loading-bar'

// export const getUsers = function(){
// 	return (dispatch) => {

// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 	  	return GET(API_URL+'api/user/').then((data) => {
// 	      	dispatch({ type: USERS.GET_ALL, payload:{data: data}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 	  	}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 	  	})
// 	}
// }

// export const getTeamMembers = function(){
// 	return (dispatch) => {

// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 	  	return GET(API_URL+'api/user/team_members/').then((data) => {
// 	      	dispatch({ type: USERS.GET_MY_TEAM_MEMBERS, payload:{data: data}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 	  	}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 	  	})
// 	}
// }

// export const createUser = function(user) {
// 	return (dispatch) => {
// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 		return POST(API_URL+'api/user/', user).then(res => {
			
// 	      	dispatch({ type: USERS.CREATE_USER, payload: {user: res}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 		}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 			throw err;
// 	  	})
// 	}
// }

// export const updateUser = (user, obj) => {
// 	return (dispatch) => {
// 		dispatch({ type: COMMON.SERVER_REQUEST})
// 		return PATCH(API_URL+'api/user/'+user.id+'/', obj).then(res => {
			
// 	      	dispatch({ type: USERS.UPDATE_USER, payload: {user: res}})
// 	      	dispatch({ type: COMMON.SERVER_SUCCESS})
// 		}).catch((err)=>{
// 			dispatch({ type: COMMON.SERVER_FAILURE})
// 			throw err;
// 	  	})
// 	}
// }

// // export const deleteUsers = (lead, dispatch) => {
// // 	let header = {
// // 	"Content-Type" : 'application/json',
// // 	"Authorization": "Token "+ window.localStorage.getItem('token')
// // 	}
// // 	DELETE('https://api.agentcloud.com/api/lead/'+lead.id.toString()+'/',lead, header).then(res => {
// // 		getUsers(dispatch, header);
// // 	});
// // }
