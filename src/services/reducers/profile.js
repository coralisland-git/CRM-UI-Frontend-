import Immutable from 'immutable';
import objectAssign from 'object-assign';

import { SETTING } from '../actions/types';

const initialState = new Immutable.Map({
  token: '',
  emailTemplate: {},
  user: {id : '0'}
}).asMutable();

export default function settingReducer(state = initialState, action) {
	switch(action.type) {
		case SETTING.UPDATE_PROFILE:
 			return objectAssign({}, state, {		
 				user: {		
 					...action.payload.user		
 				}		
 			});		
 		case SETTING.UPDATE_EMAIL_TEMPLATE:		
 			return {
 				...state,
 				...action.payload.emailTemplate
 			};

 		case SETTING.UPDATE_PASSWORD:
 		    return {      
 		        ...state,         
 		        change_password_status: action.status
 		    }
		default:
			return state
	}
}
