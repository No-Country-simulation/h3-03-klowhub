import { Action } from "@/types/global.types";
import courseFormTypes from "./course-form.types";
import { CourseInfo, CourseDetails, Module } from "@/types/courses.types";
import { Promotion } from "@/types/global.types";

type SetGeneralData = Action<courseFormTypes.SET_GENERAL_DATA, CourseInfo>
type SetDetailsData = Action<courseFormTypes.SET_DETAILS_DATA, CourseDetails>
type SetModulesData = Action<courseFormTypes.SET_MODULES_DATA, Module[]>
type AddNewModule = Action<courseFormTypes.ADD_NEW_MODULE, Module>
type SetPromotionData = Action<courseFormTypes.SET_PROMOTION_DATA, Promotion | null>

export type CourseFormActions = 
  | SetGeneralData
  | SetDetailsData
  | SetModulesData
  | AddNewModule
  | SetPromotionData

export const setGeneralData = (generalData: CourseInfo): SetGeneralData => {
  return { type: courseFormTypes.SET_GENERAL_DATA, payload: generalData }   
};
export const setDetailsData = (detailsData: CourseDetails): SetDetailsData => {
  return { type: courseFormTypes.SET_DETAILS_DATA, payload: detailsData }   
};
export const setModulesData = (modulesData: Module[]): SetModulesData => {
  return { type: courseFormTypes.SET_MODULES_DATA, payload: modulesData }   
};
export const addNewModule = (module: Module): AddNewModule => {
  return { type: courseFormTypes.ADD_NEW_MODULE, payload: module }   
};
export const setPromotionData = (promotionData: Promotion | null): SetPromotionData => {
  return { type: courseFormTypes.SET_PROMOTION_DATA, payload: promotionData }   
};

// mock actions

// export const setGeneralDataMock = (generalData: CourseInfo): SetGeneralData => {
//   return { type: courseFormTypes.SET_GENERAL_DATA, payload: generalData }   
// };
// export const setDetailsDataMock = (detailsData: CourseDetails): SetDetailsData => {
//   return { type: courseFormTypes.SET_DETAILS_DATA, payload: detailsData }   
// };
// export const setModulesDataMock = (modulesData: Module[]): SetModulesData => {
//   return { type: courseFormTypes.SET_MODULES_DATA, payload: modulesData }   
// };
// export const setPromotionDataMock = (promotionData: Promotion): SetPromotionData => {
//   return { type: courseFormTypes.SET_PROMOTION_DATA, payload: promotionData }   
// };
