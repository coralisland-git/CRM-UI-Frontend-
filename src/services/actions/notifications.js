import { NOTIFICATIONS, COMMON } from './types';
import { GET, POST, PUT, DELETE,PATCH } from './http.service';
import { API_URL } from '../env';


export const getNotifications = function(){
	return (dispatch) => {

		dispatch({ type: COMMON.SERVER_REQUEST})
	  	return GET(API_URL+'api/notification/').then((data) => {
	      	dispatch({ type: NOTIFICATIONS.GET_ALL_NOTIFICATIONS, payload:{data: data}})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	  	}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
	  	})
	}
}


export const updateNotification = (notification, obj) => {
	return (dispatch) => {
		dispatch({ type: COMMON.SERVER_REQUEST})
		return PATCH(API_URL+'api/notification/'+notification.id+'/', obj).then(res => {
			
	      	dispatch({ type: NOTIFICATIONS.UPDATE_NOTIFICATION, payload: {notification: res}})
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
		}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
			throw err;
	  	})
	}
}
