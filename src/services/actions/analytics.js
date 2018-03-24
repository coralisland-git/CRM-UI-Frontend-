import { ANALYTICS } from './types';
import { GET, POST, PUT, DELETE } from './http.service';
import { API_URL } from '../env';

export function getData(from_date, to_date) {
	return (dispatch) => {

		let header = {
			"Content-Type" : 'application/json',
			"Authorization": "Token "+ window.localStorage.getItem('token')
		}
		GET(API_URL+"/api/lead/get_stats/?from="+from_date+'&to='+to_date+'', header).then(data => {
			dispatch({ 
				type: ANALYTICS.GET_DATA, 
				lead: data['lead'],
				contact: data['contact'],
				from_date: from_date,
				to_date: to_date
			})
		})
	}
}
