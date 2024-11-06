import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
  itemState: itemReducer,
});

export default rootReducer;
