"use client"

import { Store } from "@/contexts/store/store.types";
import StoreCtx from "./store.context";
import { ReactNode, useState } from "react";
import { STORE_INITIAL_STATE } from "./store.context";

type Props = {
  children: ReactNode
}

const StoreCtxProvider = ({ children }: Props) => {
  const [ store, setStore ] = useState<Store>(STORE_INITIAL_STATE)

  return (
    <StoreCtx.Provider value={{ store, setStore }}>{ children }</StoreCtx.Provider>
  )
};

export default StoreCtxProvider
