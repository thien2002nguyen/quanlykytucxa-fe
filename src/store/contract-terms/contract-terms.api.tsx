import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  ContractTermsResponse,
  DetailContractTermResponse,
  ParameterPostContractTerm,
  ParameterPutContractTerm,
} from "./contract-terms.type";

const baseUrl = "/contract-terms";
const contractTermsApi = {
  // Get all contract terms
  async getContractTerms(): Promise<ContractTermsResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  // Create a new contract term
  async postContractTerm(params: ParameterPostContractTerm): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  // Get detail of a specific contract term by ID
  async getDetailContractTerm(id: string): Promise<DetailContractTermResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  // Update a contract term by ID
  async putContractTerm(params: ParameterPutContractTerm): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  // Delete a contract term by ID
  async deleteContractTerm(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default contractTermsApi;
