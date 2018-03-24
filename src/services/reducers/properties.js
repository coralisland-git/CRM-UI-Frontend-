import Immutable from 'immutable';
import objectAssign from 'object-assign';

import { PROPERTY } from '../actions/types';

const initialState = {
  properties: [],
  searchResults: [],
  totalCount: '',
  property: {},
  pageState: {},
  selected_property: {},
};

const PropertyReducer  = (state = initialState, action) => {
    switch(action.type) {
        case PROPERTY.GET_ALL:
            let properties = action.properties;
            if(properties.mlsId)
                properties = [].concat(properties);
            if(!properties)
                properties = [];
            return objectAssign({}, state, {
                properties: properties,
                totalCount: action.totalCount
            });
        case PROPERTY.SEARCH_ALL:
            return objectAssign({}, state, {
                searchResults: action.searchResults,
                totalSearchCount: action.totalSearchCount
            });
        case PROPERTY.SET_ACTIVE:
            return objectAssign({}, state, {
                property: action.property,
                pageState: action.pageState
            })
        case PROPERTY.SET_PAGE_STATE:
            return objectAssign({}, state, {
                pageState: {
                    ...state.pageState,
                    ...action.stateFields
                }
            })
        case PROPERTY.SELECT_PROPERTY:
            return objectAssign({}, state, {
                selected_property: action.property,
            })

        default:
            return state;
    }
}

export default PropertyReducer;