import { createContext, Dispatch, SetStateAction } from "react";
import { Store } from "@/contexts/store/store.types";

export type StoreKeys = "user" | "ui"

type Props = {
  store: Store
  setStore: Dispatch<SetStateAction<Store>>
}

const StoreCtx = createContext<Props>({
  store: {
    user: {
      id: "",
      email: "",
      fullname: "",
      jwtToken: "",
    },
    ui: {
      mode: "explorer"
    }
  },
  setStore: () => {}
});

export default StoreCtx
