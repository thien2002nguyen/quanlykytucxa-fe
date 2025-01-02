import { MetaPagination, ParameterGet } from "@/utils/contants";
import { User } from "../users/users.type";

export enum PaymentStatusEnum {
  UNPAID = "unpaid", // Chưa trả
  PAID = "paid", // Đã trả
  PARTIALLY_PAID = "partially_paid", // Còn nợ
}

export enum PaymentMethodEnum {
  CASH = "cash", // Thanh toán bằng tiền mặt
  BANK_TRANSFER = "bank_transfer", // Thanh toán qua chuyển khoản ngân hàng
  VNPAY = "vnpay", // Thanh toán qua VNPAY
  MOMO = "momo", // Thanh toán qua MOMO
}

export type PaymentContractType = {
  _id: string;
  contractTypeId: string;
  contractTitle: string;
  duration: number;
  unit: string;
};

export type PaymentRoom = {
  _id: string;
  roomId: string;
  roomName: string;
  floor: number;
  roomType: string;
  roomBlock: string;
  price: number;
};

export type PaymentService = {
  _id: string;
  serviceId: string;
  name: string;
  price: number;
  createdAt: string;
};

export type PaymentHistory = {
  _id: string;
  paymentMethod: PaymentMethodEnum;
  amount: number;
  paymentDate: string;
};

export interface TotalBillInterface {
  totalAmount: number;
  remainingAmount: number;
  paidAmount: number;
}

export type Payment = {
  _id: string;
  fullName: string;
  studentCode: string;
  phoneNumber: string;
  email: string;
  room: PaymentRoom;
  services: PaymentService[];
  contractType: PaymentContractType;
  totalAmount: number;
  remainingAmount: number;
  paidAmount: number;
  status: PaymentStatusEnum;
  adminId?: User;
  note?: string;
  paymentHistory?: PaymentHistory[];
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

export type PaymentsByUserResponse = {
  data: Payment[];
  meta: MetaPagination;
  totalBill: TotalBillInterface;
};

export type DetailPaymentResponse = {
  data: Payment;
};

export interface ParameterPayBillById {
  paymentId: string;
  paymentMethod: PaymentMethodEnum;
  amount: number;
}

export interface ParameterCreatePaymentUrl {
  amount: number;
  orderInfo: string;
}

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
    totalBill: TotalBillInterface;
    loading: boolean;
    error?: string;
  };

  dataDetailPayment: {
    data: Payment;
    loading: boolean;
    error?: string;
  };
}
