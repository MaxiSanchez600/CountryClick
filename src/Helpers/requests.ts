import axios from "axios";
import { URL_API } from "../Config/env/env";
import {
  API_RESPONSE_GET_FEEDERS,
  API_RESPONSE_GET_FEEDER_BY_IP,
  API_RESPONSE_UPDATE_REPORT,
  FeederReport,
} from "../Config/typescript/interfaces";

export const apiFetchGetFeeders = async () => {
  return await axios.get<API_RESPONSE_GET_FEEDERS>(
    URL_API + "api/beta/v1/feeders"
  );
};

export const apiFetchGetFeederByIp = async (id: string) => {
  return await axios.get<API_RESPONSE_GET_FEEDER_BY_IP>(
    URL_API + `api/beta/v1/feederbyid?id=${id}`
  );
};

export const apiFetchUpdateReport = async (report: FeederReport) => {
  return await axios.post<API_RESPONSE_UPDATE_REPORT>(
    URL_API + "api/beta/v1/update/report",
    { data: report }
  );
};
