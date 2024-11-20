import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  ServicesResponse,
  DetailServiceResponse,
  ParameterPostService,
  ParameterPutService,
} from "./services.type";

const baseUrl = "/services";

const servicesApi = {
  async getServices(): Promise<ServicesResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async postService(params: ParameterPostService): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailService(id: string): Promise<DetailServiceResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putService(params: ParameterPutService): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteService(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default servicesApi;
