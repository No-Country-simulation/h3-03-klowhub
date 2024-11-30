"use client"

import { createContext, ReactNode, Dispatch } from "react"
import { ApplicationFormData } from "@/types/application.types";
import { useReducer } from "react";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { useEffect } from "react";

type Props = {
  children: ReactNode[]
}

type TApplicationCtx = {
  state: ApplicationFormData,
  dispatch: Dispatch<ApplicationFormActions>
}
export const ApplicationCtx = createContext<TApplicationCtx | undefined>(undefined)

const ApplicationCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);

  useEffect(() => { console.log('state', state) }, [ state ])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch }}>{ children }</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

