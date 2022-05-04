import { StandingsList } from './api';
import { mapChampionsResponseToDriversModel } from './helpers';

const championsResponse: StandingsList[] = [
  {
    season: '2021',
    round: '22',
    DriverStandings: [
      {
        position: '1',
        positionText: '1',
        points: '395.5',
        wins: '10',
        Driver: {
          driverId: 'max_verstappen',
          permanentNumber: '33',
          code: 'VER',
          url: 'http://en.wikipedia.org/wiki/Max_Verstappen',
          givenName: 'Max',
          familyName: 'Verstappen',
          dateOfBirth: '1997-09-30',
          nationality: 'Dutch',
        },
        Constructors: [
          {
            constructorId: 'red_bull',
            url: 'http://en.wikipedia.org/wiki/Red_Bull_Racing',
            name: 'Red Bull',
            nationality: 'Austrian',
          },
        ],
      },
    ],
  },
];

describe('mapChampionsResponseToDriversModel', () => {
  test('returns correct Champion object', () => {
    expect(mapChampionsResponseToDriversModel(championsResponse)).toEqual([
      {
        season: 2021,
        driverId: 'max_verstappen',
        givenName: 'Max',
        familyName: 'Verstappen',
        dateOfBirth: '1997-09-30',
      },
    ]);
  });
});
