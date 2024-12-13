"use client"

import { Store } from "@/contexts/store/store.types";
import StoreCtx from "./store.context";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode
}

const StoreCtxProvider = ({ children }: Props) => {
  const [ store, setStore ] = useState<Store>({} as Store)

  return (
    <StoreCtx.Provider value={{ store, setStore }}>{ children }</StoreCtx.Provider>
  )
};

export default StoreCtxProvider
