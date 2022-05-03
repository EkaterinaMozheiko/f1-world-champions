import { RacesResponse } from './api';
import { Race } from './models';
import { getFullName } from '../../helpers/getFullName';

export function mapRacesResponseToRaceModel(response: RacesResponse): Race[] {
  return response.MRData.RaceTable.Races.map(
    ({ raceName, date, round, Circuit, Results }) => {
      const location = `${Circuit.Location.locality}, ${Circuit.Location.country}`;
      const driver = Results[0].Driver;

      return {
        raceName,
        round: Number(round),
        date,
        location,
        driver: getFullName({
          familyName: driver.familyName,
          givenName: driver.givenName,
        }),
        driverId: driver.driverId,
      };
    },
  );
}
