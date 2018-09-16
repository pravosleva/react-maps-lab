import * as actionType from '../actions/ActionType';


const example10 = (state = {
  searchBox: {
    // ...
  },
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE10_SEARCHBOX:
      return { ...state, response: action.payload };
    default:
      return state
  }
}

export default example10;
