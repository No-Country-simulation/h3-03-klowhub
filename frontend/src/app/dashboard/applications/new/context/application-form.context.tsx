"use client"

import { createContext, ReactNode, Dispatch, useCallback } from "react"
import { ApplicationFormData } from "@/types/application.types";
import { useReducer } from "react";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { useEffect } from "react";
import { breakApplication } from "./application-form.utils";

type Props = {
  children: ReactNode[]
}

type TApplicationCtx = {
  state: ApplicationFormData,
  dispatch: Dispatch<ApplicationFormActions>
  submitApplication: (additionalData?: object) => Promise<string>
}
export const ApplicationCtx = createContext<TApplicationCtx | undefined>(undefined)

const ApplicationCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);

  const submitApplication = useCallback(async (additionalData = {}) => {
    const { id, ...formattedData } = breakApplication({...state, ...additionalData});
    console.log("creating aaplication: ", formattedData);

    // const res = await fetch('http://localhost:3003/courses/createCourse', { 
    //   method: 'post',
    //   body: JSON.stringify(formattedData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });   
    //
    // const createdCourse: Course = await res.json();
    // console.log('createdCourse: ', createdCourse);
    //
    // return createdCourse.id

    const temporaryId = "application-19u3-124-asdad";
    window.sessionStorage.setItem("applicationForm", JSON.stringify(formattedData))
    console.log(window.sessionStorage.getItem("applicationForm"));
    return temporaryId

  }, [state]);

  useEffect(() => { console.log('state', state) }, [ state ])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch, submitApplication }}>{ children }</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

