import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getIncidentsAction,
  getDetailIncidentAction,
} from "./incidents.action";
import {
  IncidentsResponse,
  IncidentItem,
  IncidentsState,
  DetailIncidentResponse,
} from "./incidents.type";
import { MetaPagination } from "@/utils/contants";

const initialState: IncidentsState = {
  dataIncidents: {
    data: [] as IncidentItem[],
    meta: {} as MetaPagination,
    loading: false,
    error: undefined,
  },

  dataDetailIncident: {
    data: {} as IncidentItem,
    loading: false,
    error: undefined,
  },
};

const incidentsSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //----------get incidents----------
    builder.addCase(getIncidentsAction.pending, (state) => {
      state.dataIncidents = {
        ...state.dataIncidents,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getIncidentsAction.fulfilled,
      (state, action: PayloadAction<IncidentsResponse>) => {
        state.dataIncidents = {
          ...state.dataIncidents,
          data: action.payload.data,
          meta: action.payload.meta,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getIncidentsAction.rejected, (state, action) => {
      state.dataIncidents = {
        ...state.dataIncidents,
        loading: false,
        error: action.error.message || "Lấy dữ liệu sự cố thất bại.",
      };
    });

    //----------get detail incident----------
    builder.addCase(getDetailIncidentAction.pending, (state) => {
      state.dataDetailIncident = {
        ...state.dataDetailIncident,
        loading: true,
        error: undefined,
      };
    });

    builder.addCase(
      getDetailIncidentAction.fulfilled,
      (state, action: PayloadAction<DetailIncidentResponse>) => {
        state.dataDetailIncident = {
          ...state.dataDetailIncident,
          data: action.payload.data,
          loading: false,
          error: undefined,
        };
      }
    );

    builder.addCase(getDetailIncidentAction.rejected, (state, action) => {
      state.dataDetailIncident = {
        ...state.dataDetailIncident,
        loading: false,
        error: action.error.message || "Lấy dữ liệu sự cố thất bại.",
      };
    });
  },
});

export default incidentsSlice.reducer;
