import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  ContractsResponse,
  DetailContractResponse,
  ParameterGetContract,
  ParameterPostContract,
  ParameterRegisterRoomService,
  ParameterCancelRoomService,
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

  async deleteContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },

  async confirmContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/confirm`;
    return instanceAxios.put(url);
  },

  async requestCancelContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/request-cancel`;
    return instanceAxios.put(url);
  },

  async removeRequestCancelContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/remove-request-cancel`;
    return instanceAxios.put(url);
  },

  async cancelContract(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/cancel`;
    return instanceAxios.put(url);
  },

  async checkInRoom(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/check-in-date`;
    return instanceAxios.put(url);
  },

  async checkOutRoom(id: string): Promise<any> {
    const url = `${baseUrl}/${id}/check-out-date`;
    return instanceAxios.put(url);
  },

  async registerRoomService(
    params: ParameterRegisterRoomService
  ): Promise<any> {
    const url = `${baseUrl}/${params.contractId}/register-room-service`;
    return instanceAxios.post(url, omit(params, "contractId"));
  },

  async canCelRoomService(params: ParameterCancelRoomService): Promise<any> {
    const url = `${baseUrl}/${params.contractId}/remove-service/${params.serviceId}`;
    return instanceAxios.delete(url);
  },
};

export default contractsApi;
