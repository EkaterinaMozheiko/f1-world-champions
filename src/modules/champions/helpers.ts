import { ChampionsResponse } from './api';
import { Driver } from './models';

export function mapChampionsResponseToDriversModel(
  response: ChampionsResponse,
): Driver[] {
  return response.MRData.StandingsTable.StandingsLists.map(
    ({ DriverStandings, season }) => {
      const driver = DriverStandings[0].Driver;

      return {
        season,
        driverId: driver.driverId,
        givenName: driver.givenName,
        familyName: driver.familyName,
        dateOfBirth: driver.dateOfBirth,
      };
    },
  );
}
