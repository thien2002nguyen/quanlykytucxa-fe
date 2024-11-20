export enum FormAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export enum SortEnum {
  ASC = "asc",
  DESC = "desc",
}

export interface ParameterGet {
  sort?: SortEnum;
  search?: string;
  limit?: number;
  page?: number;
}

export interface MetaPagination {
  page: number;
  limit: number;
  total: number;
}

export const PAGE_SIZE_OPTIONS = [5, 10, 50];

export const genderOptions = [
  { value: "NAM", label: "Nam" },
  { value: "NU", label: "Nữ" },
];

export const dayOfWeekOptions = [
  { value: "monday", label: "Thứ 2" },
  { value: "tuesday", label: "Thứ 3" },
  { value: "wednesday", label: "Thứ 4" },
  { value: "thursday", label: "Thứ 5" },
  { value: "friday", label: "Thứ 6" },
  { value: "saturday", label: "Thứ 7" },
  { value: "sunday", label: "Chủ nhật" },
];
