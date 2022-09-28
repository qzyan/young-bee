import { createStore, combineReducers } from 'redux';
import currUserReducer from './reducers/currUser';
import { composeWithDevTools } from 'redux-devtools-extension'

//combine reducers
const allReducers = combineReducers({ currUser: currUserReducer })

export default createStore(allReducers,composeWithDevTools());
