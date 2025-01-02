import { PaymentMethodEnum } from "@/store/payments/payments.type";

export const filterPaymentMethodOptions = [
  { value: PaymentMethodEnum.BANK_TRANSFER, label: "Chuyển khoản ngân hàng" },
  { value: PaymentMethodEnum.CASH, label: "Tiền mặt" },
  { value: PaymentMethodEnum.VNPAY, label: "VNPAY" },
  { value: PaymentMethodEnum.MOMO, label: "MOMO" },
];

export const getPaymentMethodLabel = (method: PaymentMethodEnum): string => {
  const foundOption = filterPaymentMethodOptions.find(
    (option) => option.value === method
  );
  return foundOption ? foundOption.label : "";
};
