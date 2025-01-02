import { PaymentStatusEnum } from "@/store/payments/payments.type";

export const filterPaymentStatusOptions = [
  { value: PaymentStatusEnum.PAID, label: "Đã thanh toán" },
  { value: PaymentStatusEnum.UNPAID, label: "Chưa thanh toán" },
  { value: PaymentStatusEnum.PARTIALLY_PAID, label: "Đang nợ" },
];

export const getPaymentStatusLabel = (status: PaymentStatusEnum): string => {
  const foundOption = filterPaymentStatusOptions.find(
    (option) => option.value === status
  );
  return foundOption ? foundOption.label : "";
};
