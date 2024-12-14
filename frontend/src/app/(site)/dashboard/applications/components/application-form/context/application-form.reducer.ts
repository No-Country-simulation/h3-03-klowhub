import { ApplicationFormData } from "@/types/application.types";
import { APPLICATION_INFO_INITIAL_STATE } from "../components/general-form/general-form.consts";
import { APPLICATION_MEDIA_INITIAL_STATE } from "../components/media-form/media-form.consts";
import { ApplicationFormActions } from "./application-form.actions";
import { APPLICATION_DETAILS_INITIAL_STATE } from "../components/details-form/details-form.consts";

export const APPLICATION_FORM_INITIAL_STATE: ApplicationFormData = {
  general: APPLICATION_INFO_INITIAL_STATE,
  details: APPLICATION_DETAILS_INITIAL_STATE,
  media: APPLICATION_MEDIA_INITIAL_STATE,
  promotion: null
};

const applicationFormReducer = (state: ApplicationFormData, action: ApplicationFormActions): ApplicationFormData => {
  switch (action.type) {
    case "SET_GENERAL_DATA":
      return { ...state, general: action.payload }
    case "SET_DETAILS_DATA":
      return { ...state, details: action.payload }
    case "SET_MEDIA_DATA":
      return { ...state, media: action.payload }
    case "SET_PROMOTION_DATA":
      return { ...state, promotion: action.payload }
    default:
      return state
  }
};

export default applicationFormReducer
