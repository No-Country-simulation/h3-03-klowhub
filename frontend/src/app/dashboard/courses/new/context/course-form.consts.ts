import { Course } from "@/types/courses.types";
import { COURSE_INFO_INITIAL_STATE } from "../components/general-info-form/general-info-form.consts";
import { COURSE_DETAILS_INITIAL_STATE } from "../components/details-form/details-form.consts";

export const COURSE_FORM_INITIAL_STATE: Course = {
  generalInfo: COURSE_INFO_INITIAL_STATE,
  details: COURSE_DETAILS_INITIAL_STATE,
  modules: [],
  promotion: null
};
