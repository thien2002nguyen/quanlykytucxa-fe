export type Banner = {
  _id: string;
  url: string;
  isActive: boolean;
  createdAt: string;
};

export type BannersResponse = {
  data: Banner[];
};

export type DetailBannerResponse = {
  data: Banner;
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
    data: Banner[];
    loading: boolean;
    error?: string;
  };

  dataDetailBanner: {
    data: Banner;
    loading: boolean;
    error?: string;
  };
}
