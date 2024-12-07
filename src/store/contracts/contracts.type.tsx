import { MetaPagination, ParameterGet } from "@/utils/contants";

export enum TimeUnitEnum {
  YEAR = "year", // Năm
  MONTH = "month", // Tháng
  DAY = "day", // Ngày
}

export enum StatusEnum {
  PENDING = "pending", // Đang chờ xác nhận
  CONFIRMED = "confirmed", // Đã xác nhận
  PENDING_CANCELLATION = "pending_cancellation", // Đang chờ hủy
  CANCELLED = "cancelled", // Đã hủy
}

export type Room = {
  roomId: string; // ID của phòng
  roomName: string; // Tên phòng
  price: number; // Giá thuê phòng
};

export type Service = {
  serviceId: string; // ID của dịch vụ
  name: string; // Tên dịch vụ
  price: number; // Giá dịch vụ
  status: StatusEnum; // Trạng thái của dịch vụ
  confirmedAt?: string; // Thời gian xác nhận (không bắt buộc)
};

export type Term = {
  termId: string; // ID của điều khoản
  content: string; // Nội dung điều khoản
};

export type ContractType = {
  contractTypeId: string; // ID loại hợp đồng
  title: string; // Loại hợp đồng
  duration: number; // Thời gian hợp đồng
  unit: TimeUnitEnum; // Đơn vị thời gian
};

export type Contract = {
  _id: string; // ID hợp đồng
  studentCode: string; // Mã sinh viên
  room: Room; // Thông tin phòng thuê
  service: Service[]; // Danh sách dịch vụ liên quan
  terms: Term[]; // Điều khoản hợp đồng
  contractType: ContractType; // Thông tin loại hợp đồng
  startDate?: string; // Ngày bắt đầu (không bắt buộc)
  endDate?: string; // Ngày kết thúc (không bắt buộc)
  adminId?: string; // ID quản trị viên tạo hợp đồng
  status: StatusEnum; // Trạng thái hợp đồng
  createdAt: string; // Thời gian tạo hợp đồng
  updatedAt: string; // Thời gian cập nhật hợp đồng
};

export interface ParameterGetContract extends ParameterGet {
  filter?: StatusEnum;
}

export type ContractsResponse = {
  data: Contract[]; // Danh sách hợp đồng
  meta: MetaPagination; // Phân trang
};

export type DetailContractResponse = {
  data: Contract; // Thông tin chi tiết của một hợp đồng
};

export interface ParameterPostContract {
  studentCode: string; // Mã sinh viên
  room: Omit<Room, "roomName">; // Thông tin phòng
  service: Omit<Service, "status" | "confirmedAt">[]; // Danh sách dịch vụ không bao gồm trạng thái và thời gian xác nhận
  terms: Term[]; // Danh sách điều khoản
  contractType: Omit<ContractType, "title">; // Loại hợp đồng
  status: StatusEnum; // Trạng thái
}

export interface ParameterPutContract extends Partial<ParameterPostContract> {
  id: string; // ID của hợp đồng cần cập nhật
}

export interface ContractsState {
  dataContracts: {
    data: Contract[]; // Dữ liệu danh sách hợp đồng
    meta: MetaPagination; // Phân trang
    loading: boolean; // Trạng thái tải dữ liệu
    error?: string; // Thông báo lỗi nếu có
  };

  dataDetailContract: {
    data: Contract; // Dữ liệu chi tiết hợp đồng
    loading: boolean; // Trạng thái tải dữ liệu
    error?: string; // Thông báo lỗi nếu có
  };
}
