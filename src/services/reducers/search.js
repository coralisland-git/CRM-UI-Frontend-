import { SEARCH } from '../actions/types';
import Immutable from 'immutable';
import objectAssign from 'object-assign';

const initialState = {
  searchKey: '',
  currentUrl: ''
};


const Search = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH.GET:
            return state;
            break;
        case SEARCH.SAVE:
            return { ...state, searchKey: action.payload.key, currentUrl: action.payload.url };
            break;
        default: return state;
    }
}

export default Search;