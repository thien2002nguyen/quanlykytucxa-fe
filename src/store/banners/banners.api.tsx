import { instanceAxios } from "@/config/axios";
import { BannersResponse, ParameterPostBanner } from "./banners.type";

const baseUrl = "/banners";
const bannersApi = {
  async getBanners(): Promise<BannersResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async postBanners(params: ParameterPostBanner): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },
};

export default bannersApi;
