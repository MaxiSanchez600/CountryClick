import { Status } from "./enums";

export interface INTERFACE_NATION {
  amountClicks: number;
  name: string;
  __v: number;
  _id: string;
}

export interface FeederReport {
  description: string;
  id: number;
  img?: string;
  status: Status;
}

export interface FeedersWithReport {
  id: number;
  qrId: string;
  location: string;
  latitude: string;
  longitude: string;
  isOn: boolean;
  description: string;
  FeederReportId: number;
  FeederReport: FeederReport;
}

export interface API_RESPONSE_GET_FEEDERS {
  data: FeedersWithReport[];
  status: number;
  error: string;
}

export interface API_RESPONSE_GET_FEEDER_BY_IP {
  data: FeedersWithReport;
  status: number;
  error: string;
}

export interface API_RESPONSE_UPDATE_REPORT {
  data: FeederReport;
  status: number;
  error: string;
}
