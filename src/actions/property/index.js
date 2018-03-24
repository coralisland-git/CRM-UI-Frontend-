import { EVENTS } from '../../constants/Types';
import { GET, POST, PUT, DELETE } from '../http.service';


const url = "https://localhost:8000";

export const getProperties = (params) => (dispatch) => {

	let real_url = url + params;
    console.log('AA:',params)
	return GET(real_url).then(function(res){
        // Some actions with dispatch
	}).catch(function(err){
		throw new Error("some error detected");
	});
}

