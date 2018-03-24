import { PROPERTY } from './types';
import { GET, POST, PUT, DELETE, GET_WITH_HEADER } from './http.service';


// GET(url)
// POST(url, obj, headers)
// PUT(url, obj, headers)
// DELETE(url, obj, headers)

const _url = "https://api.simplyrets.com/properties";


export const getProperties = (url, params, mlsid=null) => (dispatch) => {
	let real_url = _url;
	if(mlsid)
		real_url = real_url + '/' + mlsid;
	else
		real_url = real_url + '?' + params;
	let data = {};
	const headers ={
		'Authorization': 'Basic ' + params
	};
	debugger
	return GET_WITH_HEADER(real_url, headers).then(function(res) {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}

		res.property.then((response) => {
			let data = {
				properties: response,
				totalCount: res.totalCount
			}
			dispatch({ type: PROPERTY.GET_ALL, properties: response, totalCount: res.totalCount })
		})
		
	}).catch(function(error) {
		console.log("Response Error", error);
		dispatch({ type: PROPERTY.GET_ALL, properties: [], totalCount: 0 })
	});
}

export const searchProperties = (url, params) => (dispatch) => {
	let real_url = 'https://api.simplyrets.com/properties?' + url;
	console.log('$$$: ', real_url)
	let data = {};
	const headers ={
		'Authorization': 'Basic ' + params
	};
	debugger
	return GET_WITH_HEADER(real_url, headers).then(function(res) {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}
		res.property.then((response) => {
			console.log('result property: ', response)
			let data = {
				properties: response,
				totalCount: res.totalCount
			}
			dispatch({ type: PROPERTY.SEARCH_ALL, searchResults: response, totalSearchCount: res.totalCount })
		})

	}).catch(function(error) {
		throw new Error(error);
	});
}

export const setActiveProperty = (property, pageState) => (dispatch) => {
	dispatch({ type: PROPERTY.SET_ACTIVE, property: property, pageState: pageState })
}

export const setPropertyPageState = (obj) => (dispatch) => {
	dispatch({ type: PROPERTY.SET_PAGE_STATE, stateFields: obj})
}


export const searchPropertiesC = (url, params, dispatch) => {
	let real_url = 'https://api.simplyrets.com/properties?' + url;
	let data = {};
	const headers ={
		'Authorization': 'Basic ' + params
	};
	
	return GET_WITH_HEADER(real_url, headers).then(function(res) {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}
		res.property.then((response) => {
			let data = {
				properties: response,
				totalCount: res.totalCount
			}
			dispatch({ type: PROPERTY.SEARCH_ALL, searchResults: response, totalSearchCount: res.totalCount })
		})

	}).catch(function(error) {
		throw new Error(error);
	});
}


export const getProperty = (mlsId, params, dispatch) => {
	let real_url = 'https://api.simplyrets.com/properties/' + mlsId;
	const headers = {
		'Authorization': 'Basic ' + params
	}

	return GET_WITH_HEADER(real_url, headers).then((res) => {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}
		res.property.then((response) => {
			dispatch({ type: PROPERTY.SELECT_PROPERTY, property: response });
		});
	}).catch((err) => {
		throw new Error(err);
	});
}
