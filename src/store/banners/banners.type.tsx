export type Banners = {
  _id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
};

export type BannersResponse = {
  data: Banners[];
};

export type DetailBannersResponse = {
  data: Banners;
};

export interface ParameterPostBanner {
  url: string;
}

export interface ParameterPutBanner extends ParameterPostBanner {
  id: string;
}

export type ParameterPatchBanner = {
  bannerIds: string[];
  isActive: boolean;
};

export interface BannersState {
  dataBanners: {
    data: Banners[];
    loading: boolean;
    error?: string;
  };

  dataDetailBanner: {
    data: Banners;
    loading: boolean;
    error?: string;
  };
}
