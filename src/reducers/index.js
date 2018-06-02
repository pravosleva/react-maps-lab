import { combineReducers } from 'redux';
import counter from './counterReducer';
import searchField from './searchFieldReducer';
import markers from './markersReducer';


const mainReducer = combineReducers({
  counter,
  searchField,
  markers,
})

export default mainReducer;
