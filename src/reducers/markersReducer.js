import * as actionType from '../actions/ActionType';
import * as bigDataSample10k from './dataSample/bigData_10k.json';
import * as bigDataSample100k from './dataSample/bigData_100k.json';

const markers = (
  state = {
    items: bigDataSample10k,
    activeMarkerKey: 'activeMarkerKey',
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
