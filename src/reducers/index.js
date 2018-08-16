import { combineReducers } from 'redux';
import counter from './counterReducer';
import searchField from './searchFieldReducer';
import markers from './markersReducer';
import userGeoParams from './userGeoParamsReducer';


const mainReducer = combineReducers({
  counter,
  searchField,
  markers,
  userGeoParams,
})

export default mainReducer;
