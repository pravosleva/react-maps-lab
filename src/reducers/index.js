import { combineReducers } from 'redux';
import counter from './counterReducer';
import { searchField, searchFieldValue } from './searchFieldReducer';
import markers from './markersReducer';
import userGeoParams from './userGeoParamsReducer';
import example9 from './example9';
import example10 from './example10';
import example12 from './example12';
import currentPage from './currentPage';


const mainReducer = combineReducers({
  counter,
  searchField,
  searchFieldValue,
  markers,
  userGeoParams,
  example9,
  example10,
  example12,
  currentPage,
})

export default mainReducer;
