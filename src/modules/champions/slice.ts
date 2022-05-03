import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from '../../models';

import type { RootState } from '../../store';
import { Driver } from './models';

export interface ChampionsState {
  list: readonly Driver[];
  loadingState: LoadingState;
}

export const initialState: ChampionsState = {
  list: [],
  loadingState: 'loading',
};

const championsSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {
    getChampions(state) {
      state.loadingState = 'loading';
    },
    getChampionsSuccess(state, action: PayloadAction<Driver[]>) {
      state.loadingState = 'success';
      state.list = action.payload;
    },
    getChampionsFailed(state) {
      state.loadingState = 'failed';
    },
  },
});

const selectSelf = (state: RootState) => state.champions;

export const selectChampions = createSelector(
  selectSelf,
  (state) => state.list,
);

export const createChampionOfTheSeasonSelector = (
  season: string | null,
): ((state: RootState) => Driver | undefined) =>
  createSelector(selectSelf, (state) =>
    state.list.find((item) => item.season === season),
  );

const selectStatus = createSelector(selectSelf, (state) => state.loadingState);

export const selectLastSeason = createSelector(
  selectSelf,
  (state) => state.list[0]?.season || null,
);

export const selectIsLoading = createSelector(
  selectStatus,
  (loadingState) => loadingState === 'loading',
);

export const selectIsFailed = createSelector(
  selectStatus,
  (loadingState) => loadingState === 'failed',
);

export const { getChampions, getChampionsSuccess, getChampionsFailed } =
  championsSlice.actions;

export default championsSlice.reducer;
