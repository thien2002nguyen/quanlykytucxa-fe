import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  NewsResponse,
  DetailNewsResponse,
  ParameterPostNews,
  ParameterPutNews,
} from "./news.type";
import { ParameterGet } from "@/utils/contants";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/news";
const newsApi = {
  async getNews(params: ParameterGet): Promise<NewsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postNews(params: ParameterPostNews): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailNews(idOrSlug: string): Promise<DetailNewsResponse> {
    const url = `${baseUrl}/${idOrSlug}`;
    return instanceAxios.get(url);
  },

  async putNews(params: ParameterPutNews): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteNews(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default newsApi;
