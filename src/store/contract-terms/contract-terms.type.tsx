export type ContractTerm = {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ContractTermsResponse = {
  data: ContractTerm[];
};

export type DetailContractTermResponse = {
  data: ContractTerm;
};

export interface ParameterPostContractTerm {
  content: string;
}

export interface ParameterPutContractTerm extends ParameterPostContractTerm {
  id: string;
}

export interface ContractTermsState {
  dataContractTerms: {
    data: ContractTerm[];
    loading: boolean;
    error?: string;
  };

  dataDetailContractTerm: {
    data: ContractTerm;
    loading: boolean;
    error?: string;
  };
}
