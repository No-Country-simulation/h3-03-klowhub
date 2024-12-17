import { createContext, Dispatch, SetStateAction } from "react";
import { SessionStore } from "./session-store.types";

export type StoreKeys = "projectForm" | "applicationForm" | "courseForm"

type Props = {
  sessionStore: SessionStore
  setSessionStore: Dispatch<SetStateAction<SessionStore>>
}

export const SESSION_STORE_INITIAL_STATE: SessionStore = {
};

const SessionStoreCtx = createContext<Props>({
  sessionStore: SESSION_STORE_INITIAL_STATE,
  setSessionStore: () => {}
});

export default SessionStoreCtx
