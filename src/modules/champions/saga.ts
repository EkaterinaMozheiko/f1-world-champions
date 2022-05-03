import { call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import * as api from './api';
import { getChampionsSuccess, getChampionsFailed } from './slice';
import { mapChampionsResponseToDriversModel } from './helpers';
import { FROM_YEAR } from '../../helpers/constants';

function* fetchChampions() {
  try {
    const { data }: AxiosResponse<api.ChampionsResponse> = yield call(
      api.getChampions,
    );

    const drivers = mapChampionsResponseToDriversModel(data)
      .filter((driver) => Number(driver.season) >= FROM_YEAR)
      .sort((a, b) => (Number(a.season) < Number(b.season) ? 1 : -1));

    yield put(getChampionsSuccess(drivers));
  } catch (error) {
    console.error(error);

    yield put(getChampionsFailed());
  }
}

export default function* championsSaga() {
  yield call(fetchChampions);
}
