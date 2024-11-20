export type RoomType = {
  _id: string;
  type: string;
  price: number;
  isActive: boolean;
  createdAt: string;
};

export type RoomTypesResponse = {
  data: RoomType[];
};

export type DetailRoomTypeResponse = {
  data: RoomType;
};

export interface ParameterPostRoomType {
  type: string;
  price: number;
}

export interface ParameterPutRoomType extends ParameterPostRoomType {
  id: string;
}

export interface RoomTypesState {
  dataRoomTypes: {
    data: RoomType[];
    loading: boolean;
    error?: string;
  };

  dataDetailRoomType: {
    data: RoomType;
    loading: boolean;
    error?: string;
  };
}
