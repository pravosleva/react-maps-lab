import * as actionType from './ActionType';


export const addCounter = () => ({
  type: actionType.ADD_COUNTER,
  payload: 1
});

export const removeCounter = () => ({
  type: actionType.REMOVE_COUNTER,
  payload: 1
});

export const updateSearchField = (e) => ({
  type: actionType.UPDATE_SEARCH_FIELD,
  payload: e.target.value,
});

export const updateMarkers = (markers) => ({
  type: actionType.UPDATE_MARKERS,
  payload: markers,
});

export const updateActiveMarkerKey = (markerKey) => ({
  type: actionType.UPDATE_ACTIVE_MARKER_KEY,
  payload: markerKey,
});

export const updateMapCenter = (mapCenter) => ({
  type: actionType.UPDATE_MAP_CENTER,
  payload: mapCenter,
});

export const updateUserGeoParams = (obj) => ({
  type: actionType.UPDATE_GEO_PARAMS,
  payload: obj,
});
