"use client"

import { createContext, ReactNode, Dispatch } from "react"
import { ApplicationFormData } from "@/types/application.types";
import { useReducer } from "react";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { useEffect } from "react";
import { prepareApplicationSubmit } from "./application-form.utils";

type Props = {
  children: ReactNode[]
}

type TApplicationCtx = {
  state: ApplicationFormData,
  dispatch: Dispatch<ApplicationFormActions>
  submit: (data: ApplicationFormData) => Promise<void>
}
export const ApplicationCtx = createContext<TApplicationCtx | undefined>(undefined)

const submit = async (data: ApplicationFormData) => {
  const formattedData = prepareApplicationSubmit(data);
  console.log("creating application: ", formattedData);

  // const res = await fetch('http://localhost:3003/applications', { 
  //   method: 'post',
  //   body: JSON.stringify(formattedData),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });   
  //
  // const createdCourse = await res.json();
  // console.log('createdCourse: ', createdCourse);

};

const ApplicationCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);

  useEffect(() => { console.log('state', state) }, [ state ])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch, submit }}>{ children }</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

