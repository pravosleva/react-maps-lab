import * as actionType from '../actions/ActionType';


const currentPage = (state = {
  routePath: '/',
  listOpenedOnMobile: true,
}, action) => {
  switch (action.type) {
    case actionType.UPDATE_CURRENT_PAGE:
      return action.payload;
    default:
      return state
  }
}

export default currentPage;
