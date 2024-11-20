// Tham số đăng nhập
export type ParameterLogin = {
  userName: string;
  password: string;
};

export enum RoleAuth {
  ADMIN = "admin",
  MODERATOR = "moderator",
  STUDENT = "student",
}

// Phản hồi đăng nhập
export type LoginResponse = {
  data: {
    _id: string;
    userName: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    role: RoleAuth;
  };
  token: {
    accessToken: string;
    refreshToken: string;
    refreshExpiresIn: number;
  };
  error?: string;
};

// Trạng thái tài khoản
export interface AuthState {
  user: {
    _id: string;
    userName: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    role: RoleAuth | null;
  };
  token: {
    accessToken: string;
    refreshToken: string;
    refreshExpiresIn: number;
  };
  loading: boolean;
  error?: string;
}
