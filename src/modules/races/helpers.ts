import * as api from './api';
import { Race } from './models';
import { getFullName } from '../../helpers/getFullName';

export function mapRacesResponseToRaceModel(response: api.Race[]): Race[] {
  return response.map(({ raceName, date, Circuit, Results }) => {
    const location = `${Circuit.Location.locality}, ${Circuit.Location.country}`;
    const driver = Results[0].Driver;

    return {
      raceName,
      date,
      location,
      driver: getFullName({
        familyName: driver.familyName,
        givenName: driver.givenName,
      }),
      driverId: driver.driverId,
    };
  });
}
