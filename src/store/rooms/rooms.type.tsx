import { MetaPagination } from "@/utils/contants";

export interface DeviceItem {
  deviceName: string;
  quantity: number;
  status: boolean;
}

export interface RoomBlock {
  _id: string;
  name: string;
}

export interface RoomType {
  _id: string;
  type: string;
  price: number;
}

export type Room = {
  _id: string;
  roomName: string;
  description: string;
  maximumCapacity: number;
  floor: number;
  roomBlockId: RoomBlock;
  roomTypeId: RoomType;
  device: DeviceItem[];
  thumbnail?: string;
  images?: string[];
  isActive: boolean;
  createdAt: string;
};

export type RoomsResponse = {
  data: Room[];
  meta: MetaPagination;
};

export type DetailRoomResponse = {
  data: Room;
};

export interface ParameterPostRoom {
  roomName?: string;
  description?: string;
  maximumCapacity?: number;
  floor?: number;
  roomBlockId?: string;
  roomTypeId?: string;
  device?: DeviceItem[];
  thumbnail?: string;
  images?: string[];
  isActive?: boolean;
}

export interface ParameterPutRoom extends ParameterPostRoom {
  id: string;
}

export interface RoomsState {
  dataRooms: {
    data: Room[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailRoom: {
    data: Room;
    loading: boolean;
    error?: string;
  };
}
