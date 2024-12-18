"use client"

import StoreCtx from "./session-store.context";
import { ReactNode, useState } from "react";
import { SESSION_STORE_INITIAL_STATE } from "./session-store.context";
import { SessionStore } from "./session-store.types";

type Props = {
  children: ReactNode
}

const SessionStoreCtxProvider = ({ children }: Props) => {
  const [ sessionStore, setSessionStore ] = useState<SessionStore>(SESSION_STORE_INITIAL_STATE)

  return (
    <StoreCtx.Provider value={{ sessionStore, setSessionStore }}>{ children }</StoreCtx.Provider>
  )
};

export default SessionStoreCtxProvider
