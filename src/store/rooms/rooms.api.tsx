import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  RoomsResponse,
  DetailRoomResponse,
  ParameterPostRoom,
  ParameterPutRoom,
} from "./rooms.type";
import { ParameterGet } from "@/utils/contants";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";

const baseUrl = "/rooms";
const roomsApi = {
  async getRooms(params: ParameterGet): Promise<RoomsResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postRoom(params: ParameterPostRoom): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailRoom(id: string): Promise<DetailRoomResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putRoom(params: ParameterPutRoom): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteRoom(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default roomsApi;
