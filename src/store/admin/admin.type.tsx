export type Admin = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminResponse = {
  data: Admin[];
};

export interface DetailAdminResponse {
  data: Admin;
}

export interface AuthMeAdminResponse extends DetailAdminResponse {}

export interface ParameterPostAdmin {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatar: string;
}

export interface ParameterPutAdmin extends ParameterPostAdmin {
  id: string;
}

export interface AdminsState {
  dataAdmins: {
    data: Admin[];
    loading: boolean;
    error?: string;
  };

  dataDetailAdmin: {
    data: Admin;
    loading: boolean;
    error?: string;
  };

  dataAuthMeAdmin: {
    data: Admin;
    loading: boolean;
    error?: string;
  };
}
