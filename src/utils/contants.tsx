export enum FormAction {
  CREATE = "create",
  EDIT = "edit",
  UPDATE = "update",
  DELETE = "delete",
}

export enum SortEnum {
  ASC = "asc",
  DESC = "desc",
}

export interface ParameterInterface {
  sort?: SortEnum;
  search?: string;
  limit?: number;
  page?: number;
}

export interface ParameterGet {
  sort?: SortEnum;
  search?: string;
  limit?: number;
  page?: number;
}
