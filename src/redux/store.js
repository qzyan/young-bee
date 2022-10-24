import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import currUserReducer from './reducers/currUser';
import dialogReducer from './reducers/dialog';

// combine reducers
const allReducers = combineReducers({ currUser: currUserReducer, dialog: dialogReducer });

export default createStore(allReducers, composeWithDevTools());
