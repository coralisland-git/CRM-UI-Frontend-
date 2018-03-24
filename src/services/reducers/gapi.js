import { GAPI } from '../actions/types';

const initialState = {
	gapi: null,
	status: false, 
	message: null
}

const GapiReducer = (state=initialState, action) => {
	switch(action.type) {
		case GAPI.INIT:
			return {
				...state, 
				status: action.status, 
				message: action.message
			}
		default: return state;
	}
}

export default GapiReducer;