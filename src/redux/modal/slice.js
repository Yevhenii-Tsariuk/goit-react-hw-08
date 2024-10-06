import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalIsOpen: false,
    delModalIsOpen: false,
  },
  reducers: {
    setModal(state, action) {
      state.modalIsOpen = action.payload;
    },
    setDelModal(state, action) {
      state.delModalIsOpen = action.payload;
    },
  },
});

export const { setModal, setDelModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;