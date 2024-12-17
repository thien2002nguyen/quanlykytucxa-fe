import { MetaPagination, ParameterGet } from "@/utils/contants";

export interface DeviceItem {
  _id?: string;
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
  thumbnail: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
  roomSlug: string;
  registeredStudents: number;
};

export enum FilterRoomEnum {
  ALL = "all",
  AVAILABLE = "available",
  FULL = "full",
}

export type RoomsResponse = {
  data: Room[];
  meta: MetaPagination;
};

export type DetailRoomResponse = {
  data: Room;
};

export interface ParameterGetRoom extends ParameterGet {
  filter?: FilterRoomEnum;
  roomTypeId?: string;
}

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
