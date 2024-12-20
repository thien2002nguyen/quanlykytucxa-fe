import { MetaPagination, ParameterGet } from "@/utils/contants";
import { Room } from "../rooms/rooms.type";
import { Service } from "../services/services.type";
import { ContractTerm } from "../contract-terms/contract-terms.type";
import { ContractType } from "../contract-types/contract-types.type";
import { User } from "../users/users.type";
import { Student } from "../students/students.type";

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
  EXPIRED = "expired", // Đã quá hạn
}

export type RoomType = {
  roomId: Room; // Thông tin phòng
  price: number; // Giá thuê phòng
};

export type ServiceType = {
  serviceId: Service; // ID của dịch vụ
  name: string; // Tên dịch vụ
  price: number; // Giá dịch vụ
  createdAt?: string; // Thời gian bắt đầu
};

export type ContractTermType = {
  termId: ContractTerm; // ID của điều khoản
  content: string; // Nội dung điều khoản
};

export interface ContractTypeInterface {
  contractTypeId: ContractType; // ID loại hợp đồng
  title: string; // Loại hợp đồng
  duration: number; // Thời gian hợp đồng
  unit: TimeUnitEnum; // Đơn vị thời gian
}

export type Contract = {
  _id: string; // ID hợp đồng
  fullName: string;
  studentCode: string; // Mã sinh viên
  email: string;
  phoneNumber: string;
  studentInfomation: Student;
  room: RoomType; // Thông tin phòng thuê
  service: ServiceType[]; // Danh sách dịch vụ liên quan
  term: ContractTermType[]; // Điều khoản hợp đồng
  contractType: ContractTypeInterface; // Thông tin loại hợp đồng
  startDate?: string; // Ngày bắt đầu hợp đồng
  endDate?: string; // Ngày kết thúc hợp đồng
  adminId?: User; // ID quản trị viên tạo hợp đồng
  status: StatusEnum; // Trạng thái hợp đồng
  createdAt: string; // Thời gian tạo hợp đồng
  updatedAt: string; // Thời gian cập nhật hợp đồng
  approvedDate?: string; // Ngày duyệt hợp đồng
  checkInDate?: string; // Ngày nhận phòng
  checkOutDate?: string; // Ngày trả phòng
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
  fullName: string; // Tên sinh viên
  studentCode: string; // Mã sinh viên
  email: string; // Email
  phoneNumber: string; // Số điện thoại
  room: {
    roomId: string; // ID của phòng
    price: number; // Giá thuê phòng
  }; // Thông tin phòng
  service?: {
    serviceId: string; // ID của dịch vụ
    name: string; // Tên dịch vụ
    price: number; // Giá dịch vụ
  }[]; // Danh sách dịch vụ
  term: {
    termId: string; // ID của điều khoản
    content: string; // Nội dung điều khoản
  }[]; // Danh sách điều khoản
  contractType: {
    contractTypeId: string; // ID loại hợp đồng
    duration: number; // Thời gian hợp đồng
    unit: TimeUnitEnum; // Đơn vị thời gian
  }; // Loại hợp đồng
}

export interface ParameterRegisterRoomService {
  contractId: string;
  serviceId: string; // ID của dịch vụ
  name: string; // Tên dịch vụ
  price: number; // Giá dịch vụ
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
