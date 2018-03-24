import { CIRCLES } from '../actions/types';

class Circles {

  constructor() {
    this.circles = [{
      id:""
    }];
    this.curState = '';
    this.circle_leads = {};
  }

  getState() {
    return { ...{
      circles: this.circles,
      curState : this.curState,
      circle_leads: this.circle_leads
    } };
  }

  setCircles(circles) {
    this.circle = null;
    this.circles = [];
    if (circles.length) {
      circles.forEach((circle) => {
        this.circles.push(circle);
      });
    }
  }

  setCurState(curState) {
    this.curState = curState;
  }

  setCircle_leads(circle_leads) {
      this.circle_leads = circle_leads;
  }

}

const Circle = new Circles();

const reducer = (state = Circle.getState(), action) => {
  switch (action.type) {
    case CIRCLES.GET_ALL:
      Circle.setCircles(action.circles || []); break;
    case CIRCLES.CREATE:
      Circle.setCurState(action.curState); break;
    case CIRCLES.UPDATE:
      Circle.setCircles(action.circles); break;
    case CIRCLES.GET_CIRCLE_LEADS:
      Circle.setCircle_leads(action.circle_leads); 
      break;
    default: return state;
  }

  return Circle.getState();
};

export default reducer;
