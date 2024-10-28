import { instanceAxios } from "@/config/axios";
import { YearlyVisitsResponse } from "./monthly-visits.type";

const baseUrl = "/monthly-visits";
const monthlyVisitsApi = {
  async getVisitsByYear(year: number): Promise<YearlyVisitsResponse> {
    const url = `${baseUrl}/${year}`;
    return instanceAxios.get(url);
  },

  async incrementMonthlyVisits(): Promise<any> {
    const url = `${baseUrl}`;
    return instanceAxios.patch(url);
  },
};

export default monthlyVisitsApi;
