import { GenderEnum } from "@/store/students/students.type";

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
  isClient?: boolean;
}

export interface MetaPagination {
  page: number;
  limit: number;
  total: number;
}

export const PAGE_SIZE_OPTIONS = [5, 10, 50];

export const genderOptions = [
  { value: GenderEnum.nam, label: "Nam" },
  { value: GenderEnum.nu, label: "Nữ" },
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

export const IMAGE_NOT_FOUND = "/images/404_not_found.jpg";
export const IMAGE_DEFAULT_NOTIFICATION =
  "/images/image_default_notification.png";

export enum ActionAuthUser {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
  RESET_PASSWORD = "resetPassword",
  OTP_AUTHENTICATION = "otpAuthentication",
  CHANGE_PASSWORD = "changePassword",
}
