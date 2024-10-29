import { instanceAxios } from "@/config/axios";
import { ParameterPatchSchool, SchoolResponse } from "./school.type";

const baseUrl = "/schools";
const bannersApi = {
  async getSchool(): Promise<SchoolResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async patchSchool(params: ParameterPatchSchool): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.patch(url, params);
  },
};

export default bannersApi;
