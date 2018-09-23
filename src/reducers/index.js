import { combineReducers } from 'redux';
import counter from './counterReducer';
import searchField from './searchFieldReducer';
import markers from './markersReducer';
import userGeoParams from './userGeoParamsReducer';
import example9 from './example9';
import example10 from './example10';
import example12 from './example12';


const mainReducer = combineReducers({
  counter,
  searchField,
  markers,
  userGeoParams,
  example9,
  example10,
  example12,
})

export default mainReducer;
