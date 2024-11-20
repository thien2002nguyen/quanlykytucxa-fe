export type RoomBlock = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type RoomBlocksResponse = {
  data: RoomBlock[];
};

export type DetailRoomBlockResponse = {
  data: RoomBlock;
};

export interface ParameterPostRoomBlock {
  name: string;
}

export interface ParameterPutRoomBlock extends ParameterPostRoomBlock {
  id: string;
}

export interface RoomBlocksState {
  dataRoomBlocks: {
    data: RoomBlock[];
    loading: boolean;
    error?: string;
  };

  dataDetailRoomBlock: {
    data: RoomBlock;
    loading: boolean;
    error?: string;
  };
}
