import * as actionType from '../actions/ActionType';


const example9 = (state = {
  response: {
    // ...
  },
  apiKey: '',
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE9_RESPONSE:
      return { ...state, response: action.payload };
    case actionType.UPDATE_EXAMPLE9_API_KEY:
      return { ...state, apiKey: action.payload };
    default:
      return state
  }
}

export default example9;
