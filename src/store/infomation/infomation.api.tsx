import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  InfomationResponse,
  DetailInfomationResponse,
  ParameterPostInfomation,
  ParameterPutInfomation,
} from "./infomation.type";
import { ParameterGet } from "@/utils/contants";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/infomations";
const infomationApi = {
  async getInfomations(params: ParameterGet): Promise<InfomationResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postInfomation(params: ParameterPostInfomation): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailInfomation(
    idOrSlug: string
  ): Promise<DetailInfomationResponse> {
    const url = `${baseUrl}/${idOrSlug}`;
    return instanceAxios.get(url);
  },

  async putInfomation(params: ParameterPutInfomation): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteInfomation(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default infomationApi;
