import { MetaPagination } from "@/utils/contants";

export interface AdminInterface {
  _id: string;
  userName: string;
}

export type News = {
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

export type NewsResponse = {
  data: News[];
  meta: MetaPagination;
};

export type DetailNewsResponse = {
  data: News;
};

export interface ParameterPostNews {
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  isActive?: boolean;
}

export interface ParameterPutNews extends ParameterPostNews {
  id: string;
}

export interface NewsState {
  dataNews: {
    data: News[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailNews: {
    data: News;
    loading: boolean;
    error?: string;
  };
}
