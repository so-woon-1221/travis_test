import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface commonState {
  product: string;
  menu: string;
}

const initialState: commonState = {
  product: "클렌징",
  menu: "",
};
const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<string>) {
      state.product = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common;
