import membershipFormTypes from "./membership-form.types";
import { Action } from "@/types/global.types";
import { SelectionData } from "@/types/membership.types";
import { SellerData } from "@/types/membership.types";

type SetSelectionData = Action<membershipFormTypes.SET_SELECTION_DATA, SelectionData>
type SetSellerData = Action<membershipFormTypes.SET_SELLER_DATA, SellerData>

export type MembershipFormActions =
  | SetSelectionData
  | SetSellerData

export const setSelectionData = (selectionData: SelectionData): SetSelectionData => {
  return { type: membershipFormTypes.SET_SELECTION_DATA, payload: selectionData }   
};

export const setSellerData = (sellerData: SellerData): SetSellerData => {
  return { type: membershipFormTypes.SET_SELLER_DATA, payload: sellerData }   
};
