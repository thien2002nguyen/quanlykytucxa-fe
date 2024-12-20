import { instanceAxios } from "@/config/axios";
import { LoginResponse, ParameterLogin } from "./auth.type";

const baseUrl = "/users";
const auth = {
  async login({ userName, password }: ParameterLogin): Promise<LoginResponse> {
    const url = `${baseUrl}/login`;
    return instanceAxios.post(url, {
      userName,
      password,
    });
  },
};

export default auth;
