import { AxiosResponse } from "axios";

// Tham số đăng nhập
export type ParamLogin = {
  userName: string;
  password: string;
};

// Phản hồi đăng nhập
export type LoginResponse = {
  data: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    role: RoleAdmin;
  };
  token: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
  };
  error?: string;
};

export enum RoleAdmin {
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

// Trạng thái admin
export interface AuthAdminState {
  admin: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    role: RoleAdmin | null;
  };
  token: {
    accessToken: string;
    refreshToken: string;
    refreshExpiresIn: number;
  };
  loading: boolean;
  error?: string;
}
