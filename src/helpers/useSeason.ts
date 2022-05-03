import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLastSeason } from '../modules/champions/slice';
/*
  This hook is created to get the current year. 
  I need to synchronize year chosen in left side (world champions list)
  and year for the right side (where data about winners of the races are displayed)

  On the start there is no URL -> we check for existence world champions list and return the most recent year -> else we return null

  If the user click on the year world champion, hook returns the year from URL
*/

export function useSeason() {
  const { season } = useParams<{ season: string }>();

  const lastSeason = useSelector(selectLastSeason);

  return season || lastSeason || null;
}
