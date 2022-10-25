import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import api from "api";

const initialState = { message: "" };

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    displayMessage(state, action) {
      state.message = action.payload;
    },
    clearMessage(state) {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.destroyPicture.matchFulfilled, (state) => {
        state.message = "Photo supprimée";
      })
      .addMatcher(api.endpoints.importPicture.matchFulfilled, (state) => {
        state.message = "Photo enregistrée";
      })
      .addMatcher(
        api.endpoints.importPicture.matchRejected,
        (state, { error }) => {
          state.message = `L'enregistrement de la photo a échoué (${error})`;
        }
      );
  },
});

export const { displayMessage, clearMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

export const useMessage = () =>
  useSelector((state) => state?.messages?.message);
