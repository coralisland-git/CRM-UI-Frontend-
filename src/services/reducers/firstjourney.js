import { JOURNEY } from '../actions/types';

const InitialState = {
	circles: []
}

const JourneyReducer = (state = InitialState, action) => {
	switch(action.type) {
		case JOURNEY.GET_DEFAULT_CIRCLES:
			return {
				...state,
				circles: action.data
			}
		default: 
			return state
	}
}

export default JourneyReducer;