export class FirebaseCasesByCountry {
  id: string;
  name: string;
  infected: number;
  tested: number;
  recovered: number;
  deceased: number;
  country: string;
  moreData: string;
  historyData: string;
  sourceUrl: string;
  lastUpdatedSource: string;
  lastUpdatedApify: string;
}

export interface CasesByCountry {
  thumb: string,
  country: string,
  cases: number,
  deaths: number,
  recovered: number
}