import { StandingsList } from './api';
import { Champion } from './models';

export function mapChampionsResponseToDriversModel(
  response: StandingsList[],
): Champion[] {
  return response.map(({ season, DriverStandings }) => {
    const driver = DriverStandings[0].Driver;

    return {
      season: Number(season),
      driverId: driver.driverId,
      givenName: driver.givenName,
      familyName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
    };
  });
}
