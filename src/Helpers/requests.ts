import axios from "axios";
import { URL_API, IMAGE_CLOUD } from "../Config/env/env";
import {
  API_RESPONSE_GET_FEEDERS,
  API_RESPONSE_GET_FEEDER_BY_IP,
  API_RESPONSE_UPDATE_REPORT,
  FeederReport,
  FeedersWithReport,
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

export const apiFetchAddFeeder = async (feeder: FeedersWithReport) => {
  return await axios.post<API_RESPONSE_UPDATE_REPORT>(
    URL_API + "api/beta/v1/update/feeder",
    { data: feeder }
  );
};

export const uploadPicture = async (data: FormData) => {
  return await axios.post<{ secure_url: string }>(
    `https://api.cloudinary.com/v1_1/${IMAGE_CLOUD}/image/upload`,
    data
  );
};
