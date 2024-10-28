import { instanceAxios } from "@/config/axios";
import { LoginResponse, ParamLogin } from "./auth-admin.type";

const admin = {
  login({ userName, password }: ParamLogin): Promise<LoginResponse> {
    const url = "/admin/login";
    return instanceAxios.post(url, {
      userName,
      password,
    });
  },
};

export default admin;
