import { FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectIsFailed, selectIsLoading, selectRaces } from './slice';
import { Race } from './models';
import { createChampionOfTheSeasonSelector } from '../champions/slice';
import { Spinner, Table } from '../../components';
import { useSeason } from '../../helpers/useSeason';

import styles from './races.module.scss';

const HEADER_CELLS = [
  {
    id: 'driver',
    name: 'Driver',
  },
  {
    id: 'raceName',
    name: 'Race name',
  },
  {
    id: 'location',
    name: 'Location',
  },
  {
    id: 'date',
    name: 'Date',
  },
] as const;

function getTableRows(races: readonly Race[], currentChampionId?: string) {
  return races.map((race, index) => ({
    isActiveRow: race.driverId === currentChampionId,
    cells: HEADER_CELLS.map((headerCell) => race[headerCell.id]),
    id: String(index),
  }));
}

export const Races: FC = memo(() => {
  const season = useSeason();

  const races = useSelector(selectRaces);
  const championOfTheSeason = useSelector(
    createChampionOfTheSeasonSelector(season),
  );
  const isLoading = useSelector(selectIsLoading);
  const isFailed = useSelector(selectIsFailed);

  const driverId = championOfTheSeason?.driverId;

  const tableRows = useMemo(
    () => getTableRows(races, driverId),
    [races, driverId],
  );

  if (isLoading) {
    return (
      <div className={styles.centeredWrapper}>
        <Spinner />
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className={styles.centeredWrapper}>
        <div className={styles.message}>
          Request failed &#128543; Please try again
        </div>
      </div>
    );
  }

  if (!races.length) {
    return (
      <div className={styles.centeredWrapper}>
        <div className={styles.message}>
          Data is empty &#128543; Please change the year
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>{season} race results</h2>
      <Table headerCells={HEADER_CELLS} rows={tableRows} />
    </div>
  );
});
