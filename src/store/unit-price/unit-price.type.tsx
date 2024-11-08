// Định nghĩa kiểu cho UnitPrice
export type UnitPrice = {
  _id: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

// Định nghĩa kiểu cho phản hồi từ API khi lấy UnitPrice
export type UnitPriceResponse = {
  data: UnitPrice;
};

// Định nghĩa kiểu cho các tham số khi cập nhật thông tin UnitPrice
export interface ParameterPatchUnitPrice {
  content: string;
  description: string;
  title: string;
}

// Định nghĩa kiểu cho trạng thái của Redux trong việc quản lý thông tin UnitPrice
export interface UnitPriceState {
  dataUnitPrice: {
    data: UnitPrice;
    loading: boolean;
    error?: string;
  };
}
