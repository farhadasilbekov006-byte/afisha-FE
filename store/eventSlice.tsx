import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/services/axios";
import { Event, EvenstResponse } from "@/types/event";
import axios from "axios";

interface Filters {
  search: string;
  category: string;
  date: string;
  page: number;
  limit: number;
}

interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  total: number;
}

const initialState: EventsState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    category: "",
    date: "",
    page: 1,
    limit: 9,
  },
  total: 0,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvent",
  async (filters: Filters, { rejectWithValue }) => {
    const params = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined
      )
    );

    try {
      const response = await api.get("/events", {
        params,
      });

      console.log("========== EVENTS RESPONSE ==========");
      console.log(response.data);
      console.log("====================================");

      return response.data as EvenstResponse;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ??
            "Ошибка загрузки событий"
        );
      }

      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

const eventSlice = createSlice({
  name: "events",

  initialState,

  reducers: {
    setFilters(
      state,
      action: PayloadAction<Partial<Filters>>
    ) {
      state.filters = {
        ...state.filters,
        ...action.payload,
        page: 1,
      };
    },

    clearFilters(state) {
      state.filters = {
        search: "",
        category: "",
        date: "",
        page: 1,
        limit: 9,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchEvents.fulfilled, (state, action) => {
        console.log("Redux payload:", action.payload);

        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })

      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } =
  eventSlice.actions;

export default eventSlice.reducer;