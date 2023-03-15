import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import contactReducer from './contactSlice';

const rootReducers = combineReducers({
  contacts: contactReducer,
});

const persistConfig = {
  key: 'phonebook',
  storage,
  blacklist: ['filter'],
};

const persistedReducers = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
