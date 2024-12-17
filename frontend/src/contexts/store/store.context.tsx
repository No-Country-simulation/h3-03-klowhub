import { createContext, Dispatch, SetStateAction } from "react";
import { Store } from "@/contexts/store/store.types";

export type StoreKeys = "user" | "ui"

type Props = {
  store: Store
  setStore: Dispatch<SetStateAction<Store>>
}

export const STORE_INITIAL_STATE: Store = {
  user: {
    id: "",
    name: "",
    email: "",
    profileImg: null,
    jwtToken: "",
    sellerData: null
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
