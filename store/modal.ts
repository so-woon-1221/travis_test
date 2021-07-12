import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};
const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const modalActions = { ...modal.actions };

export default modal;
