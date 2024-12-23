import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  BannersResponse,
  DetailBannerResponse,
  ParameterPatchBanner,
  ParameterPostBanner,
  ParameterPutBanner,
} from "./banners.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/banners";
const bannersApi = {
  async getBanners(params: { isClient?: boolean }): Promise<BannersResponse> {
    let newParams;
    if (params.isClient) {
      newParams = cleanAndSerializeQueryParams(params);
    }
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postBanner(params: ParameterPostBanner): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailBanner(id: string): Promise<DetailBannerResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putBanner(params: ParameterPutBanner): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteBanner(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },

  async patchMultiActiveBanner(params: ParameterPatchBanner): Promise<any> {
    const url = `${baseUrl}/status`;
    return instanceAxios.patch(url, params);
  },
};

export default bannersApi;
