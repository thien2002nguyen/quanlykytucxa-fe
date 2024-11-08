import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  AdminResponse,
  AuthMeAdminResponse,
  DetailAdminResponse,
  ParameterPostAdmin,
  ParameterPutAdmin,
} from "./admin.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { ParameterGet } from "@/utils/contants";

const baseUrl = "/admin";
const adminsApi = {
  async getAdmins(params: ParameterGet): Promise<AdminResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postAdmin(params: ParameterPostAdmin): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailAdmin(id: string): Promise<DetailAdminResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putAdmin(params: ParameterPutAdmin): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteAdmin(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },

  async getAuthMeAdmin(): Promise<AuthMeAdminResponse> {
    const url = `${baseUrl}/auth-me`;
    return instanceAxios.get(url);
  },
};

export default adminsApi;
