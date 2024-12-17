import { MembershipFormData } from "@/types/membership.types";
import { MembershipFormActions } from "./membership-form.actions";
import { SELECTION_DATA_INITIAL_STATE } from "../steps/selection-form/selection-form.consts";
import { SELLER_FORM_INITIAL_STATE } from "../steps/seller-form/seller-form.consts";

export const MEMBERSHIP_FORM_INITIAL_STATE: MembershipFormData = {
  selectionData: SELECTION_DATA_INITIAL_STATE,
  sellerData: SELLER_FORM_INITIAL_STATE,
};

const membershipFormReducer = (state: MembershipFormData, action: MembershipFormActions): MembershipFormData => {
  switch (action.type) {
    case "SET_SELECTION_DATA":
      return { ...state, selectionData: action.payload }
    case "SET_SELLER_DATA":
      return { ...state, sellerData: action.payload }
    default:
      return state
  }
};

export default membershipFormReducer
