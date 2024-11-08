import { instanceAxios } from "@/config/axios";
import {
  IntroductionResponse,
  ParameterPatchIntroduction,
} from "./introduction.type";

const baseUrl = "/introductions";
const introductionsApi = {
  async getIntroduction(): Promise<IntroductionResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async patchIntroduction(params: ParameterPatchIntroduction): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.patch(url, params);
  },
};

export default introductionsApi;
