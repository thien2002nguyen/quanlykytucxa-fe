import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  PaymentsResponse,
  DetailPaymentResponse,
  ParameterGetPayment,
  ParameterGetPaymentByUser,
  ParameterPayBillById,
  PaymentsByUserResponse,
  ParameterCreatePaymentUrl,
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
  ): Promise<PaymentsByUserResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}/by-user?${newParams}`;
    return instanceAxios.get(url);
  },

  // Fetching a specific payment's details by ID
  async getDetailPayment(id: string): Promise<DetailPaymentResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async payBillById(params: ParameterPayBillById): Promise<any> {
    const url = `${baseUrl}/pay-bill/${params.paymentId}`;
    return instanceAxios.put(url, omit(params, "paymentId"));
  },

  // async createPaymentVnPayUrl(params: ParameterCreatePaymentUrl): Promise<any> {
  //   const url = `${baseUrl}/vnpay/create-payment`;
  //   return instanceAxios.post(url, params);
  // },

  async createPaymentMomoUrl(params: ParameterCreatePaymentUrl): Promise<any> {
    const url = `${baseUrl}/momo/create-payment`;
    return instanceAxios.post(url, params);
  },

  async checkStatusPaymentMomo(params: { orderId: string }): Promise<any> {
    const url = `${baseUrl}/momo/check-status`;
    return instanceAxios.post(url, params);
  },
};

export default paymentsApi;
