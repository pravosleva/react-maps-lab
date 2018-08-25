import * as actionType from '../actions/ActionType';
import * as bigDataSample from './dataSample/bigData_10k.json';

const markers = (
  state = {
    items: bigDataSample,
    activeMarkerKey: 'activeMarkerKey',
    mapCenter: { lat: -31.563910, lng: 147.154312 },
  },
  action,
) => {
  switch (action.type) {
    case actionType.UPDATE_MARKERS:
      return {
        ...state,
        items: action.payload,
      };
    case actionType.UPDATE_ACTIVE_MARKER_KEY:
      return {
        ...state,
        activeMarkerKey: action.payload,
      };
    case actionType.UPDATE_MAP_CENTER:
      return {
        ...state,
        mapCenter: action.payload,
      };
    default:
      return state;
  }
}

export default markers;
