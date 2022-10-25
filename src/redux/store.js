import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import currUserReducer from './reducers/currUser';
import dialogReducer from './reducers/dialog';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['dialog'],
};

// combine reducers
const allReducers = combineReducers({ currUser: currUserReducer, dialog: dialogReducer });
const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);
export default store;
export { persistor };
