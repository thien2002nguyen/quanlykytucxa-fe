import { instanceAxios } from "@/config/axios";
import omit from "lodash/omit";
import {
  StudentResponse,
  AuthMeStudentResponse,
  DetailStudentResponse,
  ParameterPostStudent,
  ParameterPutStudent,
  TotalStudentResponse,
} from "./students.type";
import { cleanAndSerializeQueryParams } from "@/utils/cleanAndSerializeQueryParams";
import { ParameterGet } from "@/utils/contants";

const baseUrl = "/students";
const studentsApi = {
  async getStudents(params: ParameterGet): Promise<StudentResponse> {
    const newParams = cleanAndSerializeQueryParams(params);
    const url = `${baseUrl}?${newParams}`;
    return instanceAxios.get(url);
  },

  async postStudent(params: ParameterPostStudent): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.post(url, params);
  },

  async getDetailStudent(id: string): Promise<DetailStudentResponse> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.get(url);
  },

  async putStudent(params: ParameterPutStudent): Promise<any> {
    const url = `${baseUrl}/${params.id}`;
    return instanceAxios.put(url, omit(params, "id"));
  },

  async deleteStudent(id: string): Promise<any> {
    const url = `${baseUrl}/${id}`;
    return instanceAxios.delete(url);
  },

  async getInfomationStudent(): Promise<AuthMeStudentResponse> {
    const url = `${baseUrl}/infomation`;
    return instanceAxios.get(url);
  },

  async importStudents(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${baseUrl}/import-file`;
    return instanceAxios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async totalStudents(): Promise<TotalStudentResponse> {
    const url = `${baseUrl}/total-student`;
    return instanceAxios.get(url);
  },
};

export default studentsApi;
