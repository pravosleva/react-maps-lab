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
      { value: 'pp.uservice.io', label: 'pp.uservice.io', remote: true },
    ],
    selectedOption: { value: 'default', label: '{ lat: 0, lng: 0 }', remote: false },
    specialKey: Math.random(),
    mapState: {
      center: { lat: 53.8, lng: 27.5 },
      zoom: 1,
      bounds: {
        ne: { lat: 86.42938051813411, lng: 139.12109375 },
        nw: { lat: 86.42938051813411, lng: -84.12109375000001 },
        se: { lat: -57.469181786263654, lng: 139.12109375 },
        sw: { lat: -57.469181786263654, lng: -84.12109375000001 },
      },
    },
  },
  action,
) => {
  switch (action.type) {
    case actionType.UPDATE_MARKERS:
      return {
        ...state,
        items: action.payload,
        specialKey: Math.random(),
      };
    case actionType.UPDATE_ACTIVE_MARKER_KEY:
      return {
        ...state,
        activeMarkerKey: action.payload,
      };
    case actionType.UPDATE_MAP_STATE:
      return {
        ...state,
        mapState: action.payload,
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
