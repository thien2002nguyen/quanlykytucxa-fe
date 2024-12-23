import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  UserResponse,
  AuthMeUserResponse,
  DetailUserResponse,
  ParameterPostUser,
  ParameterPutUser,
  ParameterRegister,
  ParameterGetUser,
  ParameterVerifyOtp,
  ParameterChangePassword,
  ParameterSendOtp,
  ParameterChangePasswordByUser,
} from "./users.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/users";
const usersApi = {
  async postUser(params: ParameterPostUser): Promise<any> {
    const url = `${baseUrl}/moderator`;
    return instanceAxios.post(url, params);
  },

  async getUsers(params: ParameterGetUser): Promise<UserResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async getDetailUser(id: string): Promise<DetailUserResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putUser(params: ParameterPutUser): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteUser(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },

  async getAuthMeUser(): Promise<AuthMeUserResponse> {
    const url = `${baseUrl}/auth-me`;
    return instanceAxios.get(url);
  },

  // api user account
  async register(params: ParameterRegister): Promise<any> {
    const url = `${baseUrl}/register`;
    return instanceAxios.post(url, params);
  },

  async verifyOtp(params: ParameterVerifyOtp): Promise<any> {
    const url = `${baseUrl}/verify-otp`;
    return instanceAxios.post(url, params);
  },

  async changePassword(params: ParameterChangePassword): Promise<any> {
    const url = `${baseUrl}/change-password`;
    return instanceAxios.post(url, params);
  },

  async sendOtp(params: ParameterSendOtp): Promise<any> {
    const url = `${baseUrl}/send-otp`;
    return instanceAxios.post(url, params);
  },

  async changePasswordByUser(
    params: ParameterChangePasswordByUser
  ): Promise<any> {
    const url = `${baseUrl}/change-password/user`;
    return instanceAxios.post(url, params);
  },
};

export default usersApi;
