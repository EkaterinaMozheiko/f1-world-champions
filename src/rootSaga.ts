import { all } from 'redux-saga/effects';

import championsSaga from './modules/champions/saga';
import racesSaga from './modules/races/saga';

export default function* rootSaga() {
  yield all([championsSaga(), racesSaga()]);
}
