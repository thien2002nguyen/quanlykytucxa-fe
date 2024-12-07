import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  ContractTypesResponse,
  DetailContractTypeResponse,
  ParameterPostContractType,
  ParameterPutContractType,
} from "./contract-types.type";

const baseUrl = "/contract-types";
const contractTypesApi = {
  async getContractTypes(): Promise<ContractTypesResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async postContractType(params: ParameterPostContractType): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailContractType(id: string): Promise<DetailContractTypeResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putContractType(params: ParameterPutContractType): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteContractType(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default contractTypesApi;
