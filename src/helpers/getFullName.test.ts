import { getFullName } from './getFullName';

describe('mapRacesResponseToRaceModel', () => {
  test('returns correct object', () => {
    expect(
      getFullName({
        familyName: 'Hamilton',
        givenName: 'Lewis',
      }),
    ).toEqual('Lewis Hamilton');
  });
});
