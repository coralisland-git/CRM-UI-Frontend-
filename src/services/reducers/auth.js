import Immutable from 'immutable';
import objectAssign from 'object-assign';

import { AUTH, USERS, SETTINGS } from '../actions/types';

const initialState = new Immutable.Map({
  token: '',
  emailTemplate: {},
  user: {id : '0'}
}).asMutable();

export default function authReducer(state = initialState, action) {
	switch(action.type) {
		case AUTH.AUTH:
			return objectAssign({}, state, {
				user: {
					...action.user
				}
			});
		case USERS.UPDATE_AUTH_USER:		
 			return objectAssign({}, state, {		
 				user: {		
 					...action.payload.user		
 				}		
 			});		
 		case USERS.UPDATE_EMAIL_TEMPLATE:		
 			return objectAssign({}, state, {		
 				emailTemplate: {		
 					...action.payload.emailTemplate		
 					}		
 			});
 		case AUTH.UPDATE:		
 			return objectAssign({}, state, {		
 				user: {		
 					...action.user		
 				}		
 			});
		case AUTH.UPDATE_USER:
			return objectAssign({}, state, {
				user: {
					...action.user
				}
			});
		default:
			return state
	}
}
