import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import currUserReducer from './reducers/currUser';

// combine reducers
const allReducers = combineReducers({ currUser: currUserReducer });

export default createStore(allReducers, composeWithDevTools());
