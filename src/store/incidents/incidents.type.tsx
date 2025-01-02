import { MetaPagination } from "@/utils/contants";

export enum IncidentStatus {
  PENDING = "pending", // Chưa xử lý
  IN_PROGRESS = "in_progress", // Đang xử lý
  RESOLVED = "resolved", // Đã xử lý
}

interface UserInfomation {
  _id: string;
  userName: string;
}

export interface IncidentItem {
  _id: string;
  description: string;
  images: string[];
  createdAt: string;
  userId: UserInfomation;
  status: IncidentStatus;
  resolvedAt?: string;
  adminId?: UserInfomation;
}

export type IncidentsResponse = {
  data: IncidentItem[];
  meta: MetaPagination;
};

export type DetailIncidentResponse = {
  data: IncidentItem;
};

export interface ParameterPostIncident {
  images: string[];
  description: string;
}

export interface ParameterPutIncident {
  id: string;
  status: IncidentStatus;
}

export interface IncidentsState {
  dataIncidents: {
    data: IncidentItem[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailIncident: {
    data: IncidentItem;
    loading: boolean;
    error?: string;
  };
}
