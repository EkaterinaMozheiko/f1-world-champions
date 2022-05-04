import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from './api';
import { getChampionsSuccess, getChampionsFailed } from './slice';
import { mapChampionsResponseToDriversModel } from './helpers';
import { FROM_YEAR } from '../../helpers/constants';

const LIMIT = 100;

/*
 * Due to the API architecture, I can't request data by period.
 * So I request all possible data by pages.
 * The advantage of this method is the opportunity to set my own limit.
 * And always receive all data instead of set static value in URL
 */

function* fetchChampions() {
  try {
    let offset = 0;
    let total = Infinity;

    const aggregatedData: api.StandingsList[] = [];

    while (offset < total) {
      const { data }: AxiosResponse<api.ChampionsResponse> = yield call(
        api.getChampions,
        { offset, limit: LIMIT },
      );

      offset += LIMIT;
      total = Number(data.MRData.total);
      aggregatedData.push(...data.MRData.StandingsTable.StandingsLists);
    }

    const drivers = mapChampionsResponseToDriversModel(aggregatedData)
      .filter((driver) => driver.season >= FROM_YEAR)
      .sort((a, b) => (a.season < b.season ? 1 : -1));

    yield put(getChampionsSuccess(drivers));
  } catch (error) {
    console.error(error);

    yield put(getChampionsFailed());
  }
}

export default function* championsSaga() {
  yield call(fetchChampions);
}
