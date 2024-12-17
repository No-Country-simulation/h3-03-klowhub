"use client"

import { useParams } from "next/navigation";
import { useReducer, useEffect, createContext, ReactNode, Dispatch, useCallback } from "react"

import useStore from "@/contexts/store/use-store.hook";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { breakApplication, groupApplication } from "./application-form.acl";
import { setGeneralData, setDetailsData, setMediaData, setPromotionData } from "./application-form.actions";

import { User } from "@/contexts/store/store.types";
import { Application, ApplicationFormData } from "@/types/application.types";

type Props = {
  children: ReactNode[]
}

export type TApplicationCtx = {
  state: ApplicationFormData,
  dispatch: Dispatch<ApplicationFormActions>
  submitApplication: (additionalData?: object) => Promise<string | undefined>
}
export const ApplicationCtx = createContext<TApplicationCtx | undefined>(undefined)

const ApplicationCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);
  const [ user ] = useStore<User>("user");
  const params = useParams();
  const applicationId = params.id;

  const submitApplication = useCallback(async (additionalData = {}) => {
    try {
      const formattedData = breakApplication({ ...state, ...additionalData }, true);
      console.log("creating application: ", formattedData);

      const endpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${user.id}${applicationId ? "/" + applicationId : ""}`;

      const res = await fetch(endpoint, { 
        method: 'post',
        body: JSON.stringify(formattedData),
        headers: {
          "Content-Type": "application/json"
        }
      });   

      const createdApplication: Application = await res.json();
      console.log("created application: ", createdApplication);

      return createdApplication.id
    } catch (err) {
      console.error(`there was an error when trying to get application data: ${err}`);
      throw err
    }
  }, [state, user.id, applicationId]);

  useEffect(() => {
    (async function () {
      try {
        if (!applicationId) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${applicationId}`);
        const applicationData = await res.json();
        const groupedApplication = groupApplication(applicationData);

        dispatch(setMediaData(groupedApplication.media))
        dispatch(setGeneralData(groupedApplication.general))
        dispatch(setDetailsData(groupedApplication.details))
        dispatch(setPromotionData(groupedApplication.promotion))
      } catch (err) {
        console.error("there was an error while getting application data: ", err)
      }
    })()
  }, [applicationId])

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <ApplicationCtx.Provider value={{ state, dispatch, submitApplication }}>{children}</ApplicationCtx.Provider>
  )
};

export default ApplicationCtxProvider

