import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducer              from './slices';
import createSagaMiddleware from '@redux-saga/core';

import rootSaga             from './sagas/rootSaga';

let sagaMiddleware = createSagaMiddleware();
const middleware   = [ sagaMiddleware ];

export const store = configureStore({
  reducer: {
    main: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

sagaMiddleware.run(rootSaga);

export default store;