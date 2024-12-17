import { createContext, Dispatch, SetStateAction } from "react";
import { Store } from "@/contexts/store/store.types";

export type StoreKeys = "user" | "ui"

type Props = {
  store: Store
  setStore: Dispatch<SetStateAction<Store>>
}

export const STORE_INITIAL_STATE = {
  user: {
    id: "",
    email: "",
    name: "",
    jwtToken: "",
  },
  ui: {
    mode: "explorer"
  }
};

const StoreCtx = createContext<Props>({
  store: STORE_INITIAL_STATE,
  setStore: () => {}
});

export default StoreCtx
