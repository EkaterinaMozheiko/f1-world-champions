import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from './api';
import { getRaces, getRacesFailed, getRacesSuccess } from './slice';
import { mapRacesResponseToRaceModel } from './helpers';
import { FROM_YEAR } from '../../helpers/constants';

/*
 * Due to the API architecture, I can't request data by period.
 * So I request all possible data by pages.
 * The advantage of this method is the opportunity to set my own limit.
 * And always receive all data instead of set static value in URL
 */

const LIMIT = 30;

function* fetchRaces(action: PayloadAction<number>) {
  try {
    const season = action.payload;

    if (season < FROM_YEAR) {
      yield put(getRacesSuccess([]));
      return;
    }

    let offset = 0;
    let total = Infinity;

    const aggregatedData: api.Race[] = [];

    while (offset < total) {
      const { data }: AxiosResponse<api.RacesResponse> = yield call(
        api.getRaces,
        { season, offset, limit: LIMIT },
      );

      offset += LIMIT;
      total = Number(data.MRData.total);
      aggregatedData.push(...data.MRData.RaceTable.Races);
    }

    const races = mapRacesResponseToRaceModel(aggregatedData).sort((a, b) =>
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
