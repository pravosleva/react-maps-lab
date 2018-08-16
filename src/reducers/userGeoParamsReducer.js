import * as actionType from '../actions/ActionType';


const userGeoParams = (
  state = {
    lat: null,
    lng: null,
    blockedByUser: false,
    enabledAndDetected: false,
    mapCenter: {
      lat: 55,
      lng: 27,
    },
    reason: 'Was not set',
  },
  action,
) => {
  switch (action.type) {
    case actionType.UPDATE_GEO_PARAMS:
      return action.payload;
    default:
      return state;
  }
}

export default userGeoParams;
