import * as actionType from '../actions/ActionType';


const counter = (state = 0, action) => {
  switch (action.type) {
    case actionType.ADD_COUNTER:
      return state + action.payload;
    case actionType.REMOVE_COUNTER:
      return state - action.payload;
    default:
      return state
  }
}

export default counter;
