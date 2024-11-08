import { instanceAxios } from "@/config/axios";
import { UnitPriceResponse, ParameterPatchUnitPrice } from "./unit-price.type";

const baseUrl = "/unit-prices"; // Địa chỉ API của đơn giá
const unitPriceApi = {
  // Lấy thông tin đơn giá
  async getUnitPrice(): Promise<UnitPriceResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url); // Gửi request GET đến API
  },

  // Cập nhật thông tin đơn giá
  async patchUnitPrice(params: ParameterPatchUnitPrice): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.patch(url, params); // Gửi request PATCH với dữ liệu cần cập nhật
  },
};

export default unitPriceApi;
