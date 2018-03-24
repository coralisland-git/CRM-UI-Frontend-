import { ANALYTICS } from '../actions/types';

const initialState = {
	from_date: moment().subtract(7, 'days').format('YYYY-MM-DD'),
	to_date: moment().format('YYYY-MM-DD'),
	lead: [],
	contact: []
}

export default function AnalyticsReducer(state = initialState, action) {
	switch(action.type) {
		case ANALYTICS.GET_DATA:
			return {
				...state,
				from_date: action.from_date,
				to_date: action.to_date,
				lead: action.lead,
				contact: action.contact
			}
		default :
			return state
	}
}
