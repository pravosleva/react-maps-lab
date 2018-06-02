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
