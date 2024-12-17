import { StatusEnum } from "@/store/contracts/contracts.type";

export const filterStatusOptions = [
  { value: StatusEnum.PENDING, label: "Đang chờ xác nhận" },
  { value: StatusEnum.CONFIRMED, label: "Đã xác nhận" },
  { value: StatusEnum.PENDING_CANCELLATION, label: "Đang chờ hủy" },
  { value: StatusEnum.CANCELLED, label: "Đã hủy" },
  { value: StatusEnum.EXPIRED, label: "Đã hết hạn" },
];

export const getStatusLabel = (status: StatusEnum): string => {
  const foundOption = filterStatusOptions.find(
    (option) => option.value === status
  );
  return foundOption ? foundOption.label : "";
};
