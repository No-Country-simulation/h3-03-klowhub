"use client"

import { useParams } from "next/navigation";
import { useReducer, useEffect, createContext, ReactNode, Dispatch, useCallback } from "react"

import useStore from "@/contexts/store/use-store.hook";
import applicationFormReducer, { APPLICATION_FORM_INITIAL_STATE } from "./application-form.reducer";
import { ApplicationFormActions } from "./application-form.actions";
import { breakApplication, groupApplication } from "./application-form.acl";
import { setGeneralData, setDetailsData, setMediaData, setPromotionData } from "./application-form.actions";

import { BTUser } from "@/types/user.types";
import { ApplicationWithFullImgs, ApplicationFormData } from "@/types/application.types";

type Props = {
  children: ReactNode[]
}

export type TApplicationCtx = {
  state: ApplicationFormData,
  dispatch: Dispatch<ApplicationFormActions>
  submitApplication: (additionalData?: object) => Promise<string | undefined>
}
export const ApplicationCtx = createContext<TApplicationCtx>({
  state: APPLICATION_FORM_INITIAL_STATE,
  dispatch: () => {},
  submitApplication: async () => undefined
})

const ApplicationCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(applicationFormReducer, APPLICATION_FORM_INITIAL_STATE);
  const [ user ] = useStore<BTUser>("user");
  const params = useParams();
  const applicationId = params.id;

  const submitApplication = useCallback(async (additionalData = {}) => {
    try {
      if (!user) return;

      const formattedData = breakApplication({ ...state, ...additionalData }, true);
      console.log("creating application: ", formattedData);

      const createEndpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${user.id}`;
      const editEndpoint = `${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${applicationId}`;

      const res = await fetch(applicationId ? editEndpoint : createEndpoint, { 
        method: applicationId ? "put" : "post",
        body: JSON.stringify(formattedData),
        headers: {
          "Content-Type": "application/json"
        }
      });   

      const createdApplication: ApplicationWithFullImgs = await res.json();
      // @ts-ignore: Unreachable code error
      // if (createdApplication.statusCode) throw Error(createdApplication.messages);
      console.log("created application: ", createdApplication);

      return createdApplication.id
    } catch (err) {
      throw err
    }
  }, [state, user, applicationId]);

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

