import axios, { AxiosResponse } from 'axios';

import { BASE_API_PATH } from '../../config/api';

interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

interface Time {
  millis: string;
  time: string;
}

interface Time2 {
  time: string;
}

interface AverageSpeed {
  units: string;
  speed: string;
}

interface FastestLap {
  rank: string;
  lap: string;
  Time: Time2;
  AverageSpeed: AverageSpeed;
}

interface Result {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time: Time;
  FastestLap: FastestLap;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results: Result[];
}

interface RaceTable {
  season: string;
  position: string;
  Races: Race[];
}

interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: RaceTable;
}

export interface RacesResponse {
  MRData: MRData;
}

export async function getRaces({
  season,
  offset,
  limit,
}: {
  season: number;
  offset: number;
  limit: number;
}): Promise<AxiosResponse<RacesResponse>> {
  return axios.get<RacesResponse>(
    `${BASE_API_PATH}/f1/${season}/results/1.json?limit=${limit}&offset=${offset}`,
  );
}
