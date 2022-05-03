import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from './api';
import { getRaces, getRacesFailed, getRacesSuccess } from './slice';
import { mapRacesResponseToRaceModel } from './helpers';
import { FROM_YEAR } from '../../helpers/constants';

function* fetchRaces(action: PayloadAction<string>) {
  try {
    const season = action.payload;

    if (Number(season) < FROM_YEAR) {
      yield put(getRacesSuccess([]));
      return;
    }

    const { data }: AxiosResponse<api.RacesResponse> = yield call(
      api.getRaces,
      season,
    );

    const races = mapRacesResponseToRaceModel(data).sort((a, b) =>
      new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1,
    );

    yield put(getRacesSuccess(races));
  } catch (error) {
    console.error(error);

    yield put(getRacesFailed());
  }
}

export default function* racesSaga() {
  yield takeLatest(getRaces.type, fetchRaces);
}
