import { LEADS, COMMON } from './types';
import { GET, POST, PUT, DELETE, PATCH } from './http.service';
import { API_URL } from '../env';

import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const getLeads = (dispatch) => {
	dispatch({ type: COMMON.SERVER_REQUEST})
  	GET(API_URL+'api/lead/?order_by=first_name').then((data) => {
      	dispatch({ type: LEADS.GET_ALL, leads: data})
      	dispatch({ type: COMMON.SERVER_SUCCESS})
  	}).catch((err)=>{
		dispatch({ type: COMMON.SERVER_FAILURE})
  	})
}

export const getLeadsByKey = (query, dispatch) => {
	dispatch({ type: COMMON.SERVER_REQUEST})
  	GET(API_URL+'api/lead/').then((data) => {
      	dispatch({ type: LEADS.GET_ALL, leads: data})
      	dispatch({ type: COMMON.SERVER_SUCCESS})
  	}).catch((err)=>{
		dispatch({ type: COMMON.SERVER_FAILURE})
  	})
}


 
export const getCurrentLead = (lead_id, dispatch) => {

  return GET(API_URL+'api/lead/'+lead_id +'/').then((data) => {
      // dispatch({ type: LEADS.GET_CURRENT_LEAD, current_lead: data})
      return data;
  })
}

export const getCurrentLead_update = (lead_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
  GET(API_URL+'api/lead/'+lead_id +'/', header).then((data) => {
      dispatch({ type: LEADS.GET_CURRENT_LEAD, current_lead: data});
  });
}

export const getLeadCircles = (lead_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
  GET(API_URL+'api/lead/'+lead_id+'/circles', header).then((data) => {
      dispatch({ type: LEADS.LEAD_CIRCLES, lead_circles: data})
  })
}

export const createLeads = (lead, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	if (lead.image == "") {
		delete lead['image'];
	}
	POST('https://api.agentcloud.com/api/lead/', lead, header).then(res => {
		getLeads(dispatch, header);
	});
}

export const updateLeads = (lead, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	if (lead.image == null || lead.image == "" || lead.image.includes('https://agent-cloud.s3.amazonaws.com/crm')) {
		delete lead['image'];
	}

	PUT('https://api.agentcloud.com/api/lead/'+lead.id.toString()+'/',lead, header).then(res => {
		getLeads(dispatch, header);
	});
}

export const patchLead = (lead_id, obj, dispatch) => {

	dispatch({ type: COMMON.SERVER_REQUEST})
	return PATCH(API_URL+'api/lead/'+lead_id+'/', obj).then(res => {
      	dispatch({ type: LEADS.PATCH_LEAD, payload: {lead: res}})
      	dispatch({ type: COMMON.SERVER_SUCCESS})
      	return res;
	}).catch((err)=>{
		dispatch({ type: COMMON.SERVER_FAILURE})
		throw err;
  	})
}

export const deleteLeads = (lead_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	DELETE('https://api.agentcloud.com/api/lead/'+lead_id+'/', header).then(res => {
		getLeads(dispatch, header);
	});
}

export const deleteLeadsBuck = (list, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	
	return POST('https://api.agentcloud.com/api/lead/delete_bulk/',list, header).then(res => {
		getLeads(dispatch, header);
		return res;
	});
}

export const createLeadsBulk = (leads, dispatch) => {

	dispatch({ type: COMMON.SERVER_REQUEST})
  	return POST(API_URL+'api/lead/add_bulk/', leads).then((data) => {
		return data;
  	}).catch((err)=>{
  		throw err;
		dispatch({ type: COMMON.SERVER_FAILURE})
  	})
}

export const convertToLeadOrContact = (leads, status, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let data = {'ids': leads ,'is_lead': status}
	return POST('https://api.agentcloud.com/api/lead/switch_leads/',data, header).then(res => {
		getLeads(dispatch, header);
		return res;
	});
}

export const uploadDocs = (file, lead_id, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let data = {'file': file ,'lead': lead_id}
	return POST('https://api.agentcloud.com/api/leadfile/',data, header).then(res => {
		return res;
	});
}

export const addRelatedContact = (lead_id, related_contact_id, relation_ship, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let data = {};
	if(lead_id > related_contact_id) {
		data = {'first': related_contact_id ,'second': lead_id, 'relation': relation_ship}
	}
	else {
		data = {'first': lead_id ,'second': related_contact_id, 'relation': relation_ship}
	}
	return POST('https://api.agentcloud.com/api/leadrelation/',data, header).then(res => {
		getRelatedContacts(lead_id, dispatch, header);
	});
}

export const updateRelatedContact = (lead_id, related_contact_id, relation_ship, id, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let data = {};
	if(lead_id > related_contact_id) {
		data = {'first': related_contact_id ,'second': lead_id, 'relation': relation_ship}
	}
	else {
		data = {'first': lead_id ,'second': related_contact_id, 'relation': relation_ship}
	}
	return PUT('https://api.agentcloud.com/api/leadrelation/'+id+'/',data, header).then(res => {
	});
	getRelatedContacts(lead_id, dispatch, header);
}

export const getRelatedContacts = (lead_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let data = {
		"lead" : lead_id
	}
  POST('https://api.agentcloud.com/api/leadrelation/leads/', data , header).then((data) => {
      dispatch({ type: LEADS.RELATED_CONTACTS, related_contacts: data})
  })
}

export const deleteRelatedContact = (id, lead_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	DELETE('https://api.agentcloud.com/api/leadrelation/'+id+'/', header).then(res => {
		getRelatedContacts(lead_id, dispatch, header);
	});
}

export const addDocFile = (lead_id, file, dispatch) => {
	let header = {
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	let url = 'https://api.agentcloud.com/api/leadfile/';
    let formData = new FormData();
    formData.append('lead', lead_id);
    formData.append('file',file);
    let data = { 
    	method: 'post', 
    	headers: header, 
    	body: formData 
	};
    return fetch(url, data).then(function(res) {
 		if (res.status >= 400) {
 			throw new Error("Bad response from server");
 		}
 		getDocFiles(dispatch, header);
 	}).catch(function(error) {
 		throw error;
 	});

}

export const getDocFiles = (dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
  GET('https://api.agentcloud.com/api/leadfile/', header).then((data) => {
      dispatch({ type: LEADS.DOC_FILES, doc_files: data})
  })
}

export const deleteDocFile = (doc_id, dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
	DELETE('https://api.agentcloud.com/api/leadfile/'+doc_id+'/', header).then(res => {
		getDocFiles(dispatch, header);
	});
}

export const getTags = (dispatch) => {
	let header = {
	"Content-Type" : 'application/json',
	"Authorization": "Token "+ window.localStorage.getItem('token')
	}
  GET(API_URL+'api/tag/', header).then((data) => {
      dispatch({ type: LEADS.TAGS_ALL, tags: data})
  })
}

export const addTag = (tag_list, dispatch) => {
	let header = {
		"Content-Type" : 'application/json',
		"Authorization": "Token "+ window.localStorage.getItem('token')
	}

	console.log('KKKKKKKK', tag_list);
	for(let t=0;t<tag_list.length;t++){
		let tag = {
			'name' : tag_list[t]
		}
		POST(API_URL+'api/tag/', tag, header).then(res => {
		});
	}
}