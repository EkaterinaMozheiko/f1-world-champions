import * as api from './api';
import { mapRacesResponseToRaceModel } from './helpers';

const raceResponse: api.Race[] = [
  {
    season: '2008',
    round: '1',
    url: 'http://en.wikipedia.org/wiki/2008_Australian_Grand_Prix',
    raceName: 'Australian Grand Prix',
    Circuit: {
      circuitId: 'albert_park',
      url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
      circuitName: 'Albert Park Grand Prix Circuit',
      Location: {
        lat: '-37.8497',
        long: '144.968',
        locality: 'Melbourne',
        country: 'Australia',
      },
    },
    date: '2008-03-16',
    time: '04:30:00Z',
    Results: [
      {
        number: '22',
        position: '1',
        positionText: '1',
        points: '10',
        Driver: {
          driverId: 'hamilton',
          permanentNumber: '44',
          code: 'HAM',
          url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
          givenName: 'Lewis',
          familyName: 'Hamilton',
          dateOfBirth: '1985-01-07',
          nationality: 'British',
        },
        Constructor: {
          constructorId: 'mclaren',
          url: 'http://en.wikipedia.org/wiki/McLaren',
          name: 'McLaren',
          nationality: 'British',
        },
        grid: '1',
        laps: '58',
        status: 'Finished',
        Time: {
          millis: '5690616',
          time: '1:34:50.616',
        },
        FastestLap: {
          rank: '2',
          lap: '39',
          Time: {
            time: '1:27.452',
          },
          AverageSpeed: {
            units: 'kph',
            speed: '218.300',
          },
        },
      },
    ],
  },
];

describe('mapRacesResponseToRaceModel', () => {
  test('returns correct Race object', () => {
    expect(mapRacesResponseToRaceModel(raceResponse)).toEqual([
      {
        raceName: 'Australian Grand Prix',
        date: '2008-03-16',
        location: 'Melbourne, Australia',
        driver: 'Lewis Hamilton',
        driverId: 'hamilton',
      },
    ]);
  });
});
