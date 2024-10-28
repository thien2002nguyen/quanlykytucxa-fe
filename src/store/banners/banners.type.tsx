export type Banners = {
  _id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
};

export type BannersResponse = {
  data: Banners[];
};

export interface ParameterPostBanner {
  url: string;
}

export interface BannersState {
  dataBanners: {
    data: Banners[];
    loading: boolean;
    error?: string;
  };
}
