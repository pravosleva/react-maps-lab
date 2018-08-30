import * as actionType from '../actions/ActionType';


const searchField = (state = { value: 'all', label: 'all' }, action) => {
  switch (action.type) {
    case actionType.UPDATE_SEARCH_FIELD:
      return action.payload;
    default:
      return state
  }
}

export default searchField;
