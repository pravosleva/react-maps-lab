import * as actionType from '../actions/ActionType';


const searchField = (state = '', action) => {
  switch (action.type) {
    case actionType.UPDATE_SEARCH_FIELD:
      return action.payload;
    default:
      return state
  }
}

export default searchField;
