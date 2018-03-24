import { USERS } from '../actions/types';

const InitialState = {
    users: [],
    change_password_status: false,
    parent: null
}

const UsersReducer  = (state = InitialState, action) => {
    switch(action.type) {
        case USERS.GET_MY_TEAM_MEMBERS:
            return {...state,  users: action.payload.data};

        case USERS.CREATE_USER:
            return {...state,  users: state.users.concat([action.payload.user])};

        case USERS.UPDATE_USER:
        	let users = this.state.users;
        	let ind;
        	let selected = users.filter((user, i) => { ind = i; return user.id == action.payload.user.id });
        	if(selected.length == 1)
        		users = users.slice(ind, 1);
        	users = users.concat(action.payload.user);

            return {...state,  users: users};

        case USERS.DELETE_MEMBER:
            users = state.users;
            selected = users.filter((user, i) => { ind = i; return user.id != action.payload.id });

            return {...state,  users: selected};

        case USERS.GET_PARENT:
            return {...state,  parent: action.payload.data};
        default:
            return state;
    }
        
}

export default UsersReducer;
