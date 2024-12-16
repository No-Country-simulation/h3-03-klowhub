import { Action } from "@/types/global.types";
import { Promotion } from "@/types/global.types";
import applicationFormTypes from "./application-form.types";
import { ApplicationDetails, ApplicationInfo, ApplicationMedia } from "@/types/application.types";

type SetGeneralData = Action<applicationFormTypes.SET_GENERAL_DATA, ApplicationInfo>
type SetDetailsData = Action<applicationFormTypes.SET_DETAILS_DATA, ApplicationDetails>
type SetMediaData = Action<applicationFormTypes.SET_MEDIA_DATA, ApplicationMedia>
type SetPromotionData = Action<applicationFormTypes.SET_PROMOTION_DATA, Promotion | null>

export type ApplicationFormActions = 
  | SetGeneralData
  | SetDetailsData
  | SetMediaData
  | SetPromotionData

export const setGeneralData = (generalData: ApplicationInfo): SetGeneralData => {
  return { type: applicationFormTypes.SET_GENERAL_DATA, payload: generalData }   
};
export const setDetailsData = (detailsData: ApplicationDetails): SetDetailsData => {
  return { type: applicationFormTypes.SET_DETAILS_DATA, payload: detailsData }   
};
export const setMediaData = (mediaData: ApplicationMedia): SetMediaData => {
  return { type: applicationFormTypes.SET_MEDIA_DATA, payload: mediaData }   
};
export const setPromotionData = (promotionData: Promotion | null): SetPromotionData => {
  return { type: applicationFormTypes.SET_PROMOTION_DATA, payload: promotionData }   
};
