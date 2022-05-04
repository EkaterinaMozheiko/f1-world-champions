import axios from 'axios';

interface Driver {
  driverId: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  permanentNumber?: string;
  code: string;
}

interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

interface StandingsTable {
  driverStandings: string;
  StandingsLists: StandingsList[];
}

interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: StandingsTable;
}

export interface ChampionsResponse {
  MRData: MRData;
}

export async function getChampions({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  return axios.get<ChampionsResponse>(
    `https://ergast.com/api/f1/driverStandings/1.json?limit=${limit}&offset=${offset}`,
  );
}
