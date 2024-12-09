import { ProjectFormData } from "@/types/project.types";
import { ProjectFormActions } from "./project-form.actions";
import { PROJECT_INFO_INITIAL_STATE } from "../components/general-form/general-form.consts";
import { PROJECT_DETAILS_INITIAL_STATE } from "../components/details-form/details-form.consts";

export const PROJECT_FORM_INITIAL_STATE: ProjectFormData = {
  id: null,
  general: PROJECT_INFO_INITIAL_STATE,
  details: PROJECT_DETAILS_INITIAL_STATE,
};

const projectFormReducer = (state: ProjectFormData, action: ProjectFormActions): ProjectFormData => {
  switch (action.type) {
    case "SET_GENERAL_DATA":
      return { ...state, general: action.payload }
    case "SET_MEDIA_DATA":
      return { ...state, details: action.payload }
    default:
      return state
  }
};

export default projectFormReducer
