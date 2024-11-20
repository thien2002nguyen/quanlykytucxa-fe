import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  RoomTypesResponse,
  DetailRoomTypeResponse,
  ParameterPostRoomType,
  ParameterPutRoomType,
} from "./room-types.type";

const baseUrl = "/room-types";
const roomTypesApi = {
  async getRoomTypes(): Promise<RoomTypesResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async postRoomType(params: ParameterPostRoomType): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailRoomType(id: string): Promise<DetailRoomTypeResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putRoomType(params: ParameterPutRoomType): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteRoomType(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default roomTypesApi;
