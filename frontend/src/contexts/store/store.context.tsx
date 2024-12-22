import { createContext, Dispatch, SetStateAction } from "react";
import { Store } from "@/contexts/store/store.types";

export type StoreKeys = "user" | "ui"

type Props = {
  store: Store
  setStore: Dispatch<SetStateAction<Store>>
}

export const STORE_INITIAL_STATE: Store = {
  user: null,
  ui: {
    mode: "explorer"
  },
  proposal: null
};

const StoreCtx = createContext<Props>({
  store: STORE_INITIAL_STATE,
  setStore: () => {}
});

export default StoreCtx
