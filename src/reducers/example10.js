import * as actionType from '../actions/ActionType';


const example10 = (state = {
  searchBox: {
    places: [],
    // ...
  },
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE10_SEARCHBOX:
      return { ...state, searchBox: action.payload };
    default:
      return state
  }
}

export default example10;
