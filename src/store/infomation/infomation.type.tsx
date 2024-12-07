import { MetaPagination } from "@/utils/contants";

export interface AdminInterface {
  _id: string;
  userName: string;
}

export type Infomation = {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  adminId: AdminInterface;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  slug: string;
};

export type InfomationResponse = {
  data: Infomation[];
  meta: MetaPagination;
};

export type DetailInfomationResponse = {
  data: Infomation;
};

export interface ParameterPostInfomation {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  isActive?: boolean;
}

export interface ParameterPutInfomation extends ParameterPostInfomation {
  id: string;
}

export interface InfomationState {
  dataInfomations: {
    data: Infomation[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailInfomation: {
    data: Infomation;
    loading: boolean;
    error?: string;
  };
}
