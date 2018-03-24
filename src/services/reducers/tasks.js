import { TASKS } from '../actions/types';
import Immutable from 'immutable';
import objectAssign from 'object-assign';
import _ from 'lodash';

const initialState = {
  tasks: [],
  totalCount: ''
};

const reducer = (state = initialState, action) => {
  let tasks;
  switch (action.type) {
    case TASKS.GET_ALL:
      return {...state, tasks: action.payload.data};
    case TASKS.CREATE:
      return {...state, tasks: state.tasks.concat([action.payload.task])};
      break;
    case TASKS.UPDATE:
      let tasks = _.cloneDeep(state.tasks); 
      let task = action.payload.task; 
      let ind = _.findIndex(tasks, function(o) { 
        return o.id == action.payload.task.id; 
      }); 
      if(ind != -1) { 
        tasks.splice(ind, 1, {...task}); 
        tasks = tasks.concat([]); 
      } 
      return {...state, tasks: tasks};
      break;
    default: return state;
  }
  return state;
};

export default reducer;
