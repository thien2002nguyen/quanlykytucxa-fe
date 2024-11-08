export type Introduction = {
  _id: string;
  slug: string;
  content: string;
  createdAt: string;
  description: string;
  youtubeUrl: string;
  title: string;
  updatedAt: string;
};

export type IntroductionResponse = {
  data: Introduction;
};

export interface ParameterPatchIntroduction {
  content: string;
  description: string;
  youtubeUrl: string;
  title: string;
}

export interface IntroductionState {
  dataIntroduction: {
    data: Introduction;
    loading: boolean;
    error?: string;
  };
}
