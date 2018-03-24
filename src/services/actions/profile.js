import { SETTING, COMMON, AUTH } from './types';
import { GET, POST, PUT, DELETE, PATCH } from './http.service';
import { API_URL } from '../env';

// , changePassword, connectInfo
export const saveProfileInfo = (user, obj) => {
	return (dispatch) => {
		dispatch({ type: COMMON.SERVER_REQUEST});
		return PATCH(API_URL+'api/user/'+user.id+'/', obj).then(res => {
	      	dispatch({ type: AUTH.UPDATE, user: res});
	      	dispatch({ type: COMMON.SERVER_SUCCESS});
		}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE});
			throw err;
	  	})		
	}
}

export const changePassword = (obj) => {
	return (dispatch) => {
		dispatch({ type: COMMON.SERVER_REQUEST})
		return POST(API_URL+'rest-auth/password/change/', obj).then(res => {
	      	dispatch({ type: COMMON.SERVER_SUCCESS})
	      	return res;
		}).catch((err)=>{
			dispatch({ type: COMMON.SERVER_FAILURE})
			throw err;
	  	});		
	}
}

export const connectInfo = (params, dispatch) => {
	
}

export const getEmailTemplate = () => {		
	return (dispatch) => {		
		dispatch({ type: COMMON.SERVER_REQUEST});		
		return GET(API_URL+'api/email_setting/').then(res => {			
			dispatch({type: SETTING.GET_EMAIL_TEMPLATE, payload: {emailTemplate: res}})		
			dispatch({ type: COMMON.SERVER_SUCCESS})		
		}).catch((err)=>{		
			dispatch({ type: COMMON.SERVER_FAILURE})		
			throw err;		
	  	});		
	}		
}		
		
export const saveEmailTemplate = (user, obj) => {		
	return (dispatch) => {		
		dispatch({ type: COMMON.SERVER_REQUEST});		
		return PATCH(API_URL+'api/user/'+user.id+'/', obj).then(res => {
	      	dispatch({ type: AUTH.UPDATE, user: res});
	      	dispatch({ type: COMMON.SERVER_SUCCESS});
		}).catch((err)=>{		
			dispatch({ type: COMMON.SERVER_FAILURE})		
			throw err;		
	  	});		
	}		
}