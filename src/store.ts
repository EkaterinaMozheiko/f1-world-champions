import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import championsReducer from './modules/champions/slice';
import racesReducer from './modules/races/slice';

const sagaMiddleware = createSagaMiddleware();

export const reducer = combineReducers({
  champions: championsReducer,
  races: racesReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
