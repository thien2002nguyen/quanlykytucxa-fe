import { MetaPagination, ParameterGet } from "@/utils/contants";

export enum PaymentStatusEnum {
  UNPAID = "unpaid", // Chưa trả
  PAID = "paid", // Đã trả
}

export enum PaymentMethodEnum {
  CASH = "cash", // Thanh toán bằng tiền mặt
  BANK_TRANSFER = "bank_transfer", // Thanh toán qua chuyển khoản ngân hàng
  VNPAY = "vnpay", // Thanh toán qua VNPAY
}

export type ContractType = {
  _id: string;
  contractTypeID: string;
  contractTitle: string;
  duration: number;
  unit: string;
};

export type PaymentRoom = {
  _id: string;
  roomID: string;
  roomName: string;
  floor: number;
  roomType: string;
  roomBlock: string;
  price: number;
};

export type PaymentService = {
  _id: string;
  serviceID: string;
  name: string;
  price: number;
  createdAt: string;
};

export type PaymentTerm = {
  _id: string;
  termID: string;
  content: string;
};

export type Payment = {
  _id: string;
  fullName: string;
  studentCode: string;
  phoneNumber: string;
  email: string;
  room: PaymentRoom;
  service: PaymentService[];
  term: PaymentTerm[];
  contractType: ContractType;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export interface ParameterGetPayment extends Omit<ParameterGet, "isClient"> {
  filter?: PaymentStatusEnum;
}

export interface ParameterGetPaymentByUser
  extends Omit<ParameterGet, "isClient"> {
  filter?: PaymentStatusEnum;
  studentCode: string;
}

export type PaymentsResponse = {
  data: Payment[];
  meta: MetaPagination;
};

export type DetailPaymentResponse = {
  data: Payment;
};

export interface PaymentsState {
  dataPayments: {
    data: Payment[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataPaymentsByUser: {
    data: Payment[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailPayment: {
    data: Payment;
    loading: boolean;
    error?: string;
  };
}
