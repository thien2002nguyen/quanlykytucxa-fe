import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  IncidentsResponse,
  DetailIncidentResponse,
  ParameterPostIncident,
  ParameterPutIncident,
} from "./incidents.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { ParameterGet } from "@/utils/contants";

const baseUrl = "/incidents";

const incidentsApi = {
  async getIncidents(params: ParameterGet): Promise<IncidentsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postIncident(params: ParameterPostIncident): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailIncident(idOrSlug: string): Promise<DetailIncidentResponse> {
    const url = `${baseUrl}/${idOrSlug}`;
    return instanceAxios.get(url);
  },

  async putIncident(params: ParameterPutIncident): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },
};

export default incidentsApi;
