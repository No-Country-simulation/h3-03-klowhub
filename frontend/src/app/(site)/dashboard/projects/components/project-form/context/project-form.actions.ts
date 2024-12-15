import projectFormTypes from "./project-form.types";
import { ProjectInfo, ProjectDetails } from "@/types/project.types";

export type Action<T, P> = {
  type: T
  payload: P
}

type SetGeneralData = Action<projectFormTypes.SET_GENERAL_DATA, ProjectInfo>
type SetDetailsData = Action<projectFormTypes.SET_DETAILS_DATA, ProjectDetails>

export type ProjectFormActions = 
  | SetGeneralData
  | SetDetailsData

export const setGeneralData = (generalData: ProjectInfo): SetGeneralData => {
  return { type: projectFormTypes.SET_GENERAL_DATA, payload: generalData }   
};
export const setDetailsData = (detailsData: ProjectDetails): SetDetailsData => {
  return { type: projectFormTypes.SET_DETAILS_DATA, payload: detailsData }   
};
