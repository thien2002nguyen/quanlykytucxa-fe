import { MetaPagination, ParameterGet } from "@/utils/contants";
import { RoleAuth } from "../auth/auth.type";

export type User = {
  _id: string;
  userName: string;
  phoneNumber: string;
  email: string;
  role: string;
  isBlocked: boolean;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  data: User[];
  meta: MetaPagination;
};

export interface DetailUserResponse {
  data: User;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthMeUserResponse extends DetailUserResponse {}

export interface ParameterPostUser {
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatar?: string;
  isBlocked?: boolean;
}

export interface ParameterPutUser extends ParameterPostUser {
  id: string;
}

export interface ParameterGetUser extends ParameterGet {
  role?: RoleAuth;
}

// type user account
export interface ParameterRegister {
  userName: string;
  email: string;
  phoneNumber: string;
  studentCode: string;
}

export interface ParameterSendOtp {
  email: string;
  studentCode: string;
}

export interface ParameterVerifyOtp {
  email: string;
  studentCode?: string;
  otp: string;
}

export interface ParameterChangePassword {
  otpAccessToken: string;
  password: string;
}

export interface VerifyOtp {
  otpVerified: boolean;
  otpAccessToken: string;
}

export interface ParameterChangePasswordByUser {
  oldPassword: string;
  newPassword: string;
}

export interface UsersState {
  dataUsers: {
    data: User[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailUser: {
    data: User;
    loading: boolean;
    error?: string;
  };

  dataAuthMeUser: {
    data: User;
    loading: boolean;
    error?: string;
  };

  dataVerifyOtp: {
    data: VerifyOtp;
    loading: boolean;
    error?: string;
  };
}
