import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookingReducer from './slices/bookingSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['booking'],
};

const persistedBookingReducer = persistReducer(
  { key: 'booking', storage, whitelist: ['savedBookings'] },
  bookingReducer
);

export const store = configureStore({
  reducer: {
    booking: persistedBookingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

