import { TEMPLATES } from '../actions/types';
import Immutable from 'immutable';
import objectAssign from 'object-assign';

const initialState = {
  templates: [],
  totalCount: ''
};

const reducer = (state = initialState, action) => {
  let templates;
  let template;
  let ind;

  switch (action.type) {
    case TEMPLATES.GET_ALL:
      return {...state, templates: action.payload.templates};
    case TEMPLATES.CREATE:
      let newTemplates = Object.assign([], state.templates);

      return {...state, templates: newTemplates.concat([action.payload.template])};
      break;
    case TEMPLATES.UPDATE:
      templates = _.cloneDeep(state.templates); 
      template = action.payload.template; 
      ind = _.findIndex(templates, function(o) { 
        return o.id == action.payload.template.id; 
      }); 
      if(ind != -1) { 
        templates.splice(ind, 1, {...template}); 
        templates = templates.concat([]); 
      } 
      return {...state, templates: templates};
      break;
    case TEMPLATES.PATCH:
      debugger
      console.log('state.templates', state.templates)
      templates = _.cloneDeep(state.templates); 
      template = action.payload.template; 
      ind = _.findIndex(templates, function(o) { 
        return o.id == action.payload.template.id; 
      }); 
      if(ind != -1) { 
        templates.splice(ind, 1, {...template}); 
        templates = templates.concat([]); 
      } 
      return {...state, templates: templates};
      break;
    default: return state;
  }
  return state;
};

export default reducer;
