export type MonthlyVisit = {
  year: number;
  month: number;
  visitCount: number;
};

export type YearlyVisitsResponse = {
  data: MonthlyVisit[];
  totalVisits: number;
};

export interface MonthlyVisitState {
  dataMonthlyVisit: {
    data: MonthlyVisit[];
    totalVisits: number;
    loading: boolean;
    error?: string;
  };
}
