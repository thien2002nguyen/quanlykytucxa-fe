export enum TimeUnitEnum {
  YEAR = "year", // Năm
  MONTH = "month", // Tháng
  DAY = "day", // Ngày
}

export type ContractType = {
  _id: string;
  title: string;
  duration: number;
  unit: TimeUnitEnum;
  createdAt: string;
  updatedAt: string;
};

export type ContractTypesResponse = {
  data: ContractType[];
};

export type DetailContractTypeResponse = {
  data: ContractType;
};

export interface ParameterPostContractType {
  title: string;
  duration: number;
  unit: TimeUnitEnum;
}

export interface ParameterPutContractType extends ParameterPostContractType {
  id: string;
}

export interface ContractTypesState {
  dataContractTypes: {
    data: ContractType[];
    loading: boolean;
    error?: string;
  };

  dataDetailContractType: {
    data: ContractType;
    loading: boolean;
    error?: string;
  };
}
