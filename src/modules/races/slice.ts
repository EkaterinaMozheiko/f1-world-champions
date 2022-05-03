import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Race } from './models';
import type { RootState } from '../../store';
import { LoadingState } from '../../models';

export interface RacesState {
  list: readonly Race[];
  loadingState: LoadingState;
}

export const initialState: RacesState = {
  list: [],
  loadingState: 'loading',
};

const racesSlice = createSlice({
  name: 'races',
  initialState,
  reducers: {
    getRaces(state, action: PayloadAction<string>) {
      state.loadingState = 'loading';
    },
    getRacesSuccess(state, action: PayloadAction<Race[]>) {
      state.loadingState = 'success';
      state.list = action.payload;
    },
    getRacesFailed(state) {
      state.loadingState = 'failed';
    },
  },
});

const selectSelf = (state: RootState) => state.races;

export const selectRaces = createSelector(selectSelf, (state) => state.list);
export const selectIsLoading = createSelector(
  selectSelf,
  (state) => state.loadingState === 'loading',
);
export const selectIsFailed = createSelector(
  selectSelf,
  (state) => state.loadingState === 'failed',
);

export const { getRaces, getRacesSuccess, getRacesFailed } = racesSlice.actions;

export default racesSlice.reducer;
