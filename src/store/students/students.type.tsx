import { MetaPagination } from "@/utils/contants";

export type Student = {
  _id: string;
  studentCode: string;
  nationalIdCard: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  takeClass: string;
  department: string;
  address: string;
  enrollmentYear: string;
  createdAt: string;
  updatedAt: string;
  roomId?: string;
};

export type StudentResponse = {
  data: Student[];
  meta: MetaPagination;
};

export interface DetailStudentResponse {
  data: Student;
}

export interface AuthMeStudentResponse extends DetailStudentResponse {}

export interface TotalStudentResponse {
  data: number;
}

export interface ParameterPostStudent {
  studentCode?: string;
  nationalIdCard?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  takeClass?: string;
  department?: string;
  address?: string;
  enrollmentYear?: string;
  roomId?: string;
}

export interface ParameterPutStudent extends ParameterPostStudent {
  id: string;
}

export interface StudentsState {
  dataStudents: {
    data: Student[];
    meta: MetaPagination;
    loading: boolean;
    error?: string;
  };

  dataDetailStudent: {
    data: Student;
    loading: boolean;
    error?: string;
  };

  dataAuthMeStudent: {
    data: Student;
    loading: boolean;
    error?: string;
  };

  dataTotalStudents: {
    data: number;
    loading: boolean;
    error?: string;
  };
}
