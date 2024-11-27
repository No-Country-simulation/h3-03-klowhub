import { CourseFormData } from "@/types/courses.types";
import { CourseFormActions } from "./course-form.actions";
import { COURSE_INFO_INITIAL_STATE } from "../components/general-form/general-form.consts";
import { COURSE_DETAILS_INITIAL_STATE } from "../components/details-form/details-form.consts";

export const COURSE_FORM_INITIAL_STATE: CourseFormData = {
  id: undefined,
  general: COURSE_INFO_INITIAL_STATE,
  details: COURSE_DETAILS_INITIAL_STATE,
  modules: [],
  promotion: undefined
};

const courseFormReducer = (state: CourseFormData, action: CourseFormActions): CourseFormData => {
  switch (action.type) {
    case "SET_GENERAL_DATA":
      return { ...state, general: action.payload }
    case "SET_DETAILS_DATA":
      return { ...state, details: action.payload }
    case "SET_MODULES_DATA":
      return { ...state, modules: action.payload }
    case "ADD_NEW_MODULE":
      return { ...state, modules: [ ...state.modules, action.payload ] }
    case "SET_PROMOTION_DATA":
      return { ...state, promotion: action.payload }
    default:
      return state
  }
};

export default courseFormReducer
