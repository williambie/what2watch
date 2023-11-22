// alertSlice.js
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AlertStatus = "success" | "error" | "info" | "warning" | "loading";

interface AlertState {
  message: string;
  status: AlertStatus;
}

const initialState: AlertState = {
  message: "",
  status: "success", // default status
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlertMessage: (
      state,
      action: PayloadAction<{ message: string; status: AlertStatus }>,
    ) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearAlertMessage: (state) => {
      state.message = "";
    },
  },
});

export const { setAlertMessage, clearAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
