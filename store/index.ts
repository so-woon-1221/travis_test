import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from "react-redux";
import modal from "./modal";
import common from "./common";

const rootReducer = combineReducers({
  modal: modal.reducer,
  common: common.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

const initialStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const wrapper = createWrapper(initialStore);
