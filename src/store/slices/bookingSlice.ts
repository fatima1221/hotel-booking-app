import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export interface DaySelection {
  day: number;
  date: string;
  hotelId: string;
  lunchId: string;
  dinnerId: string;
}

export interface BookingState {
  currentStep: number;
  citizenship: string;
  destinationCountry: string;
  startDate: string;
  numberOfDays: string;
  boardType: string;
  dailySelections: DaySelection[];
  isLoading: boolean;
  savedBookings: Array<{
    id: string;
    name: string;
    timestamp: number;
    data: Omit<BookingState, "savedBookings" | "isLoading">;
  }>;
}

const initialState: BookingState = {
  currentStep: 1,
  citizenship: "",
  destinationCountry: "",
  startDate: "",
  numberOfDays: "",
  boardType: "",
  dailySelections: [],
  isLoading: false,
  savedBookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setCitizenship: (state, action: PayloadAction<string>) => {
      state.citizenship = action.payload;
    },
    setDestinationCountry: (state, action: PayloadAction<string>) => {
      state.destinationCountry = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setNumberOfDays: (state, action: PayloadAction<string>) => {
      state.numberOfDays = action.payload;
    },
    setBoardType: (state, action: PayloadAction<string>) => {
      state.boardType = action.payload;
    },
    setDailySelections: (state, action: PayloadAction<DaySelection[]>) => {
      state.dailySelections = action.payload;
    },
    updateDaySelection: (
      state,
      action: PayloadAction<{
        dayIndex: number;
        field: keyof DaySelection;
        value: string;
      }>
    ) => {
      const { dayIndex, field, value } = action.payload;
      if (!state.dailySelections[dayIndex]) return;

      state.dailySelections[dayIndex] = {
        ...state.dailySelections[dayIndex],
        [field]: value,
      };
    },
    resetBooking: (state) => {
      Object.assign(state, {
        currentStep: 1,
        citizenship: "",
        destinationCountry: "",
        startDate: "",
        numberOfDays: "",
        boardType: "",
        dailySelections: [],
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    saveBooking: (state, action: PayloadAction<{ name: string }>) => {
      const { savedBookings, isLoading, ...bookingData } = state;

      state.savedBookings.push({
        id: crypto.randomUUID?.() || Date.now().toString(),
        name: action.payload.name,
        timestamp: Date.now(),
        data: bookingData,
      });
    },
    loadBooking: (state, action: PayloadAction<string>) => {
      const found = state.savedBookings.find((b) => b.id === action.payload);
      if (!found) return;

      Object.assign(state, {
        ...found.data,
      });
    },
    deleteSavedBooking: (state, action: PayloadAction<string>) => {
      state.savedBookings = state.savedBookings.filter(
        (b) => b.id !== action.payload
      );
    },
  },
});

export const {
  setStep,
  setCitizenship,
  setDestinationCountry,
  setStartDate,
  setNumberOfDays,
  setBoardType,
  setDailySelections,
  updateDaySelection,
  resetBooking,
  setLoading,
  saveBooking,
  loadBooking,
  deleteSavedBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
