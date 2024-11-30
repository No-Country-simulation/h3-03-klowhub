import { Promotion } from "@/types/global.types";
import applicationFormTypes from "./application-form.types";
import { ApplicationInfo, ApplicationMedia } from "@/types/application.types";

export type Action<T, P> = {
  type: T
  payload: P
}

type SetGeneralData = Action<applicationFormTypes.SET_GENERAL_DATA, ApplicationInfo>
type SetMediaData = Action<applicationFormTypes.SET_MEDIA_DATA, ApplicationMedia>
type SetPromotionData = Action<applicationFormTypes.SET_PROMOTION_DATA, Promotion>

export type ApplicationFormActions = 
  | SetGeneralData
  | SetMediaData
  | SetPromotionData

export const setGeneralData = (generalData: ApplicationInfo): SetGeneralData => {
  return { type: applicationFormTypes.SET_GENERAL_DATA, payload: generalData }   
};
export const setMediaData = (mediaData: ApplicationMedia): SetMediaData => {
  return { type: applicationFormTypes.SET_MEDIA_DATA, payload: mediaData }   
};
export const setPromotionData = (promotionData: Promotion): SetPromotionData => {
  return { type: applicationFormTypes.SET_PROMOTION_DATA, payload: promotionData }   
};
