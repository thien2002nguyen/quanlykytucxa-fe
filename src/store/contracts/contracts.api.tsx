import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  ContractsResponse,
  DetailContractResponse,
  ParameterGetContract,
  ParameterPostContract,
  ParameterPutContract,
} from "./contracts.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/contracts";
const contractsApi = {
  async getContracts(params: ParameterGetContract): Promise<ContractsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postContract(params: ParameterPostContract): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailContract(id: string): Promise<DetailContractResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putContract(params: ParameterPutContract): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default contractsApi;
