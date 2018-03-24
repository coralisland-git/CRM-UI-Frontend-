import { NOTIFICATIONS } from '../actions/types';
import _ from 'lodash';

const InitialState = {
    notifications: [],

}

const NotificationReducer  = (state = InitialState, action) => {
    switch(action.type) {
        case NOTIFICATIONS.GET_ALL_NOTIFICATIONS:
            return {...state,  notifications: action.payload.data};

        case NOTIFICATIONS.UPDATE_NOTIFICATION:
            let notifications = _.cloneDeep(state.notifications);
            let notification = action.payload.notification;
            let ind = _.findIndex(notifications, function(o) { return o.id == action.payload.notification.id; });
            if(ind != -1){
                notifications.splice(ind, 1, {...notification});
                notifications = notifications.concat([]);
            }

            return {...state,  notifications: notifications};

        default:
            return state;
    }
        
}

export default NotificationReducer;
