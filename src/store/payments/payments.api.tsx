import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  PaymentsResponse,
  DetailPaymentResponse,
  ParameterGetPayment,
  ParameterGetPaymentByUser,
} from "./payments.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/payments";
const paymentsApi = {
  // Create payments
  async createPayments(): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url);
  },

  // Get payments
  async getPayments(params: ParameterGetPayment): Promise<PaymentsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  // Get payments by user
  async getPaymentsByUser(
    params: ParameterGetPaymentByUser
  ): Promise<PaymentsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}/by-user?${newParams}`;
    return instanceAxios.get(url);
  },

  // Fetching a specific payment's details by ID
  async getDetailPayment(id: string): Promise<DetailPaymentResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },
};

export default paymentsApi;
