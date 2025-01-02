export type School = {
  _id: string;
  address: string;
  createdAt: string;
  email: string;
  facebookUrl: string;
  googleMapUrl: string;
  phoneNumber: string;
  schoolName: string;
  slogan: string;
  timeWork: string;
  updatedAt: string;
  zaloUrl: string;
  rulesAndRegulations: string;
  guidelines: string;
};

export type SchoolResponse = {
  data: School;
};

export type ParameterPatchSchool = {
  schoolName: string;
  zaloUrl: string;
  facebookUrl: string;
  googleMapUrl: string;
  phoneNumber: string;
  email: string;
  address: string;
  slogan: string;
  timeWork: string;
  rulesAndRegulations: string;
  guidelines: string;
};

export interface SchoolState {
  dataSchool: {
    data: School;
    loading: boolean;
    error?: string;
  };
}
