import { INBOX } from '../../services/actions/types';
import parseMessage from 'gmail-api-parse-message';


const _url = "https://www.googleapis.com/gmail/v1/users/";

export const getGoogleEvents = (email, dispatch) => {
	let response = [
		{
	        id: 'sldfksldf',
	        title: 'Event Name',
	        start: '2018-02-26',
	        duration: '60 min',
	        color: 'green',
	        flag_modal: ''
	    },
	    {
	        id: 'qewqsdfds',
	        title: 'Event Name',
	        start: '2018-02-15',
	        duration: '60 min',
	        color: 'pink'
	    },
	    {
	        id: 'qewqss',
	        title: 'Event Name',
	        start: '2018-02-17',
	        duration: '60 min',
	        color: 'blue'
	    }
	];

	dispatch({ type: EVENTS.GET_EVENTS, events: response });

}

export const getMails = (url, params) => (dispatch) => {

	let real_url = _url + url;
    const headers = {'Authorization': 'Bearer ' + params}
	
	let data = {};
	const options = { 
		mode: 'cors', 
		headers: new Headers({
			// 'Access-Control-Allow-Origin':'*',
			// 'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + params
		})
	};

	return fetch(real_url, options).then(function(res) {
		if (res.status >= 400) {
			throw new Error("Bad response from server");
		}
		dispatch({ type: INBOX.GET_MESSAGES})
	}).catch(function(error) {
		throw new Error(error);
	});

}

export const updateGMailApiStatus = (status) => (dispatch) => {
	dispatch({type: INBOX.UPDATE_GMAIL_API_STATUS, status: status});
};


export const getInboxMessages = () => (dispatch) => {
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'INBOX',
      'maxResults': '65536'
    }).then((response) => {
        if (response.result.messages.length != 0)
            return getDetailMessages(response.result.messages);
    }).then((messages) => {
        dispatch({
        	type: INBOX.GET_INBOX_MESSAGES,
        	messages: messages || []
        });
    })
    gapi.client.gmail.users.messages.list({
    	'userId': 'me',
    	'labelIds': 'UNREAD',
    	'maxResults': '65536'
    }).then((response) => {
        let counts = 0, seen = [];
        response.result.messages.map(item => {
            if(seen.indexOf(item.threadId) == -1)
                seen.push(item.threadId)
        })
    	dispatch({
    		type: INBOX.SET_UNREAD_COUNT, 
    		count: seen.length,
            unreadIds: seen
    	})
    })
}

export const getTrashMessages = () => (dispatch) => {
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'TRASH',
      'maxResults': 50
    }).then((response) => {            
        if (response.result.messages != undefined)
            return getDetailMessages(response.result.messages);
    }).then((messages) => {
        dispatch({
        	type: INBOX.GET_TRASH_MESSAGES,
        	messages: messages || []
        });
    })
}

export const getSentMessages = () => (dispatch) => {
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': 'SENT',
      'maxResults': 50
    }).then((response) => {
        if (response.result.messages != undefined)
            return getDetailMessages(response.result.messages);
    }).then((messages) => {
        dispatch({
        	type: INBOX.GET_SENT_MESSAGES,
        	messages: messages || []
        });
    })
}

export const getDraftMessages = () => (dispatch) => {
    gapi.client.gmail.users.drafts.list({
      'userId': 'me',
      'labelIds': 'DRAFT',
      'maxResults': 50
    }).then((response) => {
        if (response.result.drafts != undefined)
            return getDetailMessages(response.result.drafts.map(item => item.message));
    }).then((messages) => {
        dispatch({
        	type: INBOX.GET_DRAFT_MESSAGES,
        	messages: messages || []
        });
    })
    // gapi.client.gmail.users.drafts.list({
    //   'userId': 'me',
    //   'maxResults': 50
    // }).then((response) => {
    //     if (response.result.drafts != undefined) {
    //         return new Promise((resolve, reject) => {
    //             response.result.drafts.map((msg) => {
    //                 gapi.client.gmail.users.drafts.get({
    //                     'userId': 'me',
    //                     'id': msg['id'],
    //                     'format': 'full'
    //                 }).then((result) => {
    //                     let m = parseMessage(JSON.parse(result.body))
    //                     let message = {
    //                         from_email: m.headers['return-path'],
    //                         to_email: m.headers.to,
    //                         title: m.headers.from.split('<')[0].replace('"', '').replace('"', ''),
    //                         subject: m.headers.subject,
    //                         message: m.snippet,
    //                         send_time: getSendDate(m.headers.date)
    //                     }

    //                     messages.push(message);

    //                     if (messages.length == 10) {
    //                         resolve(messages);
    //                     } 
    //                 })
    //             })                
    //         })                
    //     }
    // }).then((messages) => {
    //     dispatch({
    //     	type: INBOX.GET_DRAFT_MESSAGES,
    //     	messages: messages || []
    //     });
    // })
}

export const trashMessageByIds = (ids) => (dispatch) => {
	dispatch({ 
		type: INBOX.TRASH_MESSAGE_BY_IDS, 
		ids: ids
	})
}

export const newSentMessage = (id) => (dispatch) => {
	getDetailMessages([{id}]).then(message => {
		dispatch({
			type: INBOX.NEW_SENT_MESSAGE,
			msg: message
		})
	})
}

export const newDraftMessage = (id) => (dispatch) => {
	getDetailMessages([{id}]).then(message => {
		dispatch({
			type: INBOX.NEW_DRAFT_MESSAGE,
			msg: message
		})
	})
}

const getDetailMessages = (list) => {
    let messages = new Array(list.length);
    let id_index = {}, index = 0;
    return new Promise((resolve, reject) => {
        list.map((msg, key) => {
        	id_index[msg['id']] = key;
            gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': msg['id'],
                'format': 'full'
            }).then((result) => {
            	index ++;
                let m = parseMessage(JSON.parse(result.body)),
                    to = m.headers.to;

                if (to == undefined)
                    to = "api-oauth-dev-verification@google.com"

                let from = m.headers['return-path'] || m.headers['from']

                let message = {
                    id: m.id,
                    from_email: from.replace(">", "").replace("<", ""),
                    to_email: to.replace(">", "").replace("<", ""),
                    title: m.headers.from.split('<')[0].replace('"', '').replace('"', ''),
                    subject: m.headers.subject,
                    message: getBody(result.result.payload),
                    send_time: getSendDate(m.headers.date),
                    labels: result.result.labelIds,
                }

                messages[id_index[m.id]] = message;

                if (index == list.length) {
                    resolve(messages);
                } 
            })
        })                
    })
}

const getBody = (message) => {
	var encodedBody = '';
	if(typeof message.parts === 'undefined')
		encodedBody = message.body.data;
	else
		encodedBody = getHTMLPart(message.parts);
	encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
	return decodeURIComponent(escape(window.atob(encodedBody)));
}

const getHTMLPart = (arr) => {
	if(arr)
		for(var x = 0; x <= arr.length; x++) {
			if(typeof arr[x].parts === 'undefined'){
				if(arr[x].mimeType === 'text/html')
					return arr[x].body.data;
			} else
				return getHTMLPart(arr[x].parts);
		}
	return '';
}

const getSendDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    date = d;
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}