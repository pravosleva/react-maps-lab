import { combineReducers } from 'redux';
import counterReducer from './counterReducer';


const mainReducer = combineReducers({
  counterReducer,
})

export default mainReducer;
