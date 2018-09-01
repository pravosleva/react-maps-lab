import * as actionType from '../actions/ActionType';
import * as bigDataSample10k from './dataSample/bigData_10k.json';
// import * as bigDataSample100k from './dataSample/bigData_100k.json';


const testData = {
  default: [{ lat: 0, lng: 0 }],
  bigDataSample10k,
  // bigDataSample100k,
};

const markers = (
  state = {
    items: testData.default,
    activeMarkerKey: 'activeMarkerKey',
    dataOptions: [
      { value: 'default', label: '{ lat: 0, lng: 0 }', remote: false },
      { value: 'bigDataSample10k', label: 'Big data 700 kB', remote: false },
      // { value: 'bigDataSample100k', label: 'Big data 7 MB', remote: false },
    ],
    selectedOption: { value: 'default', label: '{ lat: 0, lng: 0 }', remote: false },
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
      let data = null;
      const { items } = state;

      switch (action.payload.remote) {
        case false: data = testData[action.payload.value]; break;
        default:
          console.log(`action.payload.remote= ${action.payload.remote}. This case should not be allowed in reducer.`);
          data = [{ lat: 0, lng: 0 }];
          break;
      }

      return {
        ...state,
        selectedOption: action.payload,
        items: data ? data : items,
        specialKey: Math.random(),
      };
    default:
      return state;
  }
}

export default markers;
