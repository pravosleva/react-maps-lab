import * as actionType from './ActionType';


export const addCounter = () => ({
  type: actionType.ADD_COUNTER,
  payload: 1,
});

export const removeCounter = () => ({
  type: actionType.REMOVE_COUNTER,
  payload: 1,
});

export const updateSearchField = (e) => ({
  type: actionType.UPDATE_SEARCH_FIELD,
  payload: e,
});

export const updateMarkers = (markers) => ({
  type: actionType.UPDATE_MARKERS,
  payload: markers,
});

export const updateActiveMarkerKey = (markerKey) => ({
  type: actionType.UPDATE_ACTIVE_MARKER_KEY,
  payload: markerKey,
});

export const updateUserGeoParams = (obj) => ({
  type: actionType.UPDATE_GEO_PARAMS,
  payload: obj,
});

export const updateReactSelectSelectedOption = (obj) => ({
  type: actionType.UPDATE_REACT_SELECT_SELECTED_OPTION,
  payload: obj,
});

export const updateMapState = (obj) => ({
  type: actionType.UPDATE_MAP_STATE,
  payload: obj,
});

export const updateExample9response = (obj) => ({
  type: actionType.UPDATE_EXAMPLE9_RESPONSE,
  payload: obj,
});

export const updateExample9ApiKey = (obj) => ({
  type: actionType.UPDATE_EXAMPLE9_API_KEY,
  payload: obj,
});

export const updateExample10SearchBox = (obj) => ({
  type: actionType.UPDATE_EXAMPLE10_SEARCHBOX,
  payload: obj,
});
