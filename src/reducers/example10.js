import * as actionType from '../actions/ActionType';


const example10 = (state = {
  popupState: {
    open: false,
    step: 0,
    selectedPlace: null,
  },
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_EXAMPLE10_POPUP_STATE:
      return { ...state, popupState: action.payload };
    default:
      return state
  }
}

export default example10;
