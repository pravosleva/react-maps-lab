import * as actionType from '../actions/ActionType';


const example9 = (state = {
  response: {
    // ...
  },
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE9_RESPONSE:
      return {
        ...state,
        response: action.payload,
      };;
    default:
      return state
  }
}

export default counter;
