import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Events from './events';
import InboxReducer from './inbox';
import Circles from './circles';
import Leads from './leads';
import Tasks from './tasks';
import EventsReducer from './events';
import leadsReducer from './leads';
import authReducer from './auth';
import JourneyReducer from './firstjourney';
import PropertyReducer from './properties';
import Templates from './templates';
import UsersReducer from './users';
import AnalyticsReducer from './analytics';
import GapiReducer from './gapi';
import settingReducer from './profile';
import NotificationsReducer from './notifications';
import Search from './search';


import { loadingBarReducer } from 'react-redux-loading-bar'

const rootReducer = combineReducers({
	events: EventsReducer,
	auth: authReducer,
	leads: leadsReducer,
	routing: routerReducer,
	events: Events,
	inbox: InboxReducer,
	journey: JourneyReducer,
	property: PropertyReducer,
	circles: Circles,
	leads : Leads,
	tasks : Tasks,
  	loadingBar: loadingBarReducer,
  	templates: Templates,
  	users: UsersReducer,
  	analytics: AnalyticsReducer,
  	gapi: GapiReducer,
  	notifications: NotificationsReducer,
  	search: Search,
  	setting: settingReducer
});

export default rootReducer;