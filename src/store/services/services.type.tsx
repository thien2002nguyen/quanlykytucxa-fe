import dayjs from "dayjs";

export type ScheduleItem = {
  dayOfWeek: string;
  time: string | dayjs.Dayjs;
};

export type Service = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  isActive: boolean;
  schedule: ScheduleItem[];
  createdAt: string;
};

export type ServicesResponse = {
  data: Service[];
};

export type DetailServiceResponse = {
  data: Service;
};

export interface ParameterPostService {
  name: string;
  price: number;
  unit: string;
  schedule: ScheduleItem[];
}

export interface ParameterPutService extends ParameterPostService {
  id: string;
}

export interface ServicesState {
  dataServices: {
    data: Service[];
    loading: boolean;
    error?: string;
  };

  dataDetailService: {
    data: Service;
    loading: boolean;
    error?: string;
  };
}
