import * as actionType from '../actions/ActionType';
import * as bigDataSample10k from './dataSample/bigData_10k.json';
import * as bigDataSample100k from './dataSample/bigData_100k.json';

const markers = (
  state = {
    items: bigDataSample100k,
    activeMarkerKey: 'activeMarkerKey',
    mapCenter: { lat: -31.563910, lng: 147.154312 },
    selectedOption: { value: 'bigData_10k', label: 'Big data 700 kB' },
    specialKey: Math.random(),
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
    case actionType.UPDATE_REACT_SELECT_SELECTED_OPTION:
      let data = [];

      switch (action.payload.value) {
        case 'bigData_10k': data = bigDataSample10k; break;
        case 'bigData_100k': data = bigDataSample100k; break;
        default: data = []; break;
      }

      return {
        ...state,
        selectedOption: action.payload,
        items: data,
        specialKey: Math.random(),
      };
    default:
      return state;
  }
}

export default markers;
