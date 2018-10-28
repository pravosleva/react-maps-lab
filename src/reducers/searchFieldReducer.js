import * as actionType from '../actions/ActionType';


export const searchField = (state = { value: 'all', label: 'all' }, action) => {
  switch (action.type) {
    case actionType.UPDATE_SEARCH_FIELD:
      return action.payload;
    default:
      return state
  }
}

export const searchFieldValue = (state = '', action) => {
  switch (action.type) {
    case actionType.UPDATE_SEARCH_FIELD_VALUE:
      return action.payload;
    default:
      return state
  }
}
