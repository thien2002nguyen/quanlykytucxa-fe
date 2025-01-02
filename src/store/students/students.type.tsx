import { MetaPagination } from "@/utils/contants";
import { Contract } from "../contracts/contracts.type";
import { Room } from "../rooms/rooms.type";
import { User } from "../users/users.type";

export enum GenderEnum {
  nam = "NAM",
  nu = "NU",
}

export type Student = {
  _id: string;
  studentCode: string;
  nationalIdCard: string;
  fullName: string;
  dateOfBirth: string;
  gender: GenderEnum;
  takeClass: string;
  department: string;
  address: string;
  enrollmentYear: string;
  createdAt: string;
  updatedAt: string;
  userId?: User;
  roomId?: Room;
  contractId?: Contract;
};

export type StudentResponse = {
  data: Student[];
  meta: MetaPagination;
};

export interface DetailStudentResponse {
  data: Student;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AuthMeStudentResponse extends DetailStudentResponse {}

export interface TotalStudentResponse {
  data: number;
}

export interface ParameterPostStudent {
  studentCode?: string;
  nationalIdCard?: string;
  fullName?: string;
  dateOfBirth?: string;
  gender?: GenderEnum;
  takeClass?: string;
  department?: string;
  address?: string;
  enrollmentYear?: string;
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
