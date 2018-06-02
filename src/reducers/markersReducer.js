import * as actionType from '../actions/ActionType';


const markers = (state = [], action) => {
  switch (action.type) {
    case actionType.UPDATE_MARKERS:
      return action.payload;
    default:
      return state
  }
}

export default markers;
