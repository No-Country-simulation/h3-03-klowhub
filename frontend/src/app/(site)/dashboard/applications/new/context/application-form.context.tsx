"use client"

import { Course } from "@/types/courses.types";
import { createContext, ReactNode, Dispatch, useCallback } from "react"
import { ApplicationFormData } from "@/types/application.types";
import { useReducer } from "react";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { useEffect } from "react";
import { breakApplication } from "./application-form.acl";

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
  const [state, dispatch] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);

  const submitApplication = useCallback(async (additionalData = {}) => {
    try {
      const { id, ...formattedData } = breakApplication({ ...state, ...additionalData });
      console.log("creating aaplication: ", formattedData);

      const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}`, { 
        method: 'post',
        body: JSON.stringify(formattedData),
        headers: {
          "Content-Type": "application/json"
        }
      });   

      const createdCourse: Course = await res.json();
      console.log('createdCourse: ', createdCourse);

      return createdCourse.id
    } catch (err) {
      console.log('AAA');
      throw err
    }

    // const temporaryId = "application-19u3-124-asdad";
    // window.sessionStorage.setItem("applicationForm", JSON.stringify(formattedData))
    // console.log(window.sessionStorage.getItem("applicationForm"));
    // return temporaryId

  }, [state]);

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch, submitApplication: submitApplication as () => Promise<string>}}>{children}</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

