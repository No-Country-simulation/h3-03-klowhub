"use client"

import { Course } from "@/types/courses.types";
import { createContext, ReactNode, Dispatch, useCallback } from "react"
import { ApplicationFormData } from "@/types/application.types";
import { useReducer } from "react";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { useEffect } from "react";
import { breakApplication, groupApplication } from "./application-form.acl";
import useStore from "@/contexts/store/use-store.hook";
import { User } from "@/contexts/store/store.types";
import { useParams } from "next/navigation";
import { setGeneralData, setDetailsData, setMediaData, setPromotionData } from "./application-form.actions";

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
  const [ user ] = useStore<User>("user");
  const params = useParams();
  const applicationId = params.id;

  const submitApplication = useCallback(async (additionalData = {}) => {
    try {
      const formattedData = breakApplication({ ...state, ...additionalData });
      console.log("creating aaplication: ", formattedData);

      const endpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${user.id}${applicationId ? "/" + applicationId : ""}`;

      const res = await fetch(endpoint, { 
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

  useEffect(() => {
    (async function () {
      try {
        if (!applicationId) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${applicationId}`);
        const applicationData = await res.json();
        const groupedApplication = groupApplication(applicationData);

        dispatch(setGeneralData(groupedApplication.general))
        dispatch(setDetailsData(groupedApplication.details))
        dispatch(setMediaData(groupedApplication.media))
        dispatch(setPromotionData(groupedApplication.promotion))
      } catch (err) {
        console.error("there was an error while getting course data: ", err)
      }
    })()
  }, [applicationId])

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch, submitApplication: submitApplication as () => Promise<string>}}>{children}</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

