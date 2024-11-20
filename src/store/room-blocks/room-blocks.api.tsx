import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  RoomBlocksResponse,
  DetailRoomBlockResponse,
  ParameterPostRoomBlock,
  ParameterPutRoomBlock,
} from "./room-blocks.type";

const baseUrl = "/room-blocks";
const roomBlocksApi = {
  async getRoomBlocks(): Promise<RoomBlocksResponse> {
    const url = `${baseUrl}`;
    return instanceAxios.get(url);
  },

  async postRoomBlock(params: ParameterPostRoomBlock): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailRoomBlock(id: string): Promise<DetailRoomBlockResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putRoomBlock(params: ParameterPutRoomBlock): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteRoomBlock(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },
};

export default roomBlocksApi;
