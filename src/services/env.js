export const API_URL = 'https://api.agentcloud.com/';


export function get_g_key() {
	const G_CLIENT_ID_LOCAL = '345306632996-4e6na6efsvi30oq140hdo9pjltsv7nak.apps.googleusercontent.com';
 	const G_CLIENT_ID_DEVCRM = '345306632996-3snc87pvco5do2ossu8dlinkttgh6o14.apps.googleusercontent.com'; 
 	const G_CLIENT_ID_CRM = '345306632996-kkcs5neq6q9t5v1uk06n3j3cvq2f0md9.apps.googleusercontent.com';
	if(window.location.hostname == 'localhost')
		return G_CLIENT_ID_LOCAL 
	if(window.location.hostname == "devcrm.agentcloud.com")
		return G_CLIENT_ID_DEVCRM;
	return G_CLIENT_ID_CRM;
}

export const G_API_KEY = 'AIzaSyBkUKnbKpVUxsqdPDJTlLYMcZOQUD2HDEE';