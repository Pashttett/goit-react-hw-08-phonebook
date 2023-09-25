import { configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import contactsReducer from './contactsSlice';
import authReducer from './authApi/authSlice';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const additionalMiddleware = (getDefaultMiddleware) => {
  const middleware = getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
  return middleware;
};

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) => additionalMiddleware(getDefaultMiddleware),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export default store;
