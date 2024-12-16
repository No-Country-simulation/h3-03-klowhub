import { Membership, MembershipFormData } from "@/types/membership.types";
import { RequiredProperty } from "@/types/utils.types";

export const breakMembership = (data: RequiredProperty<MembershipFormData>): Membership => {
  const sellerData = {
    ...data.sellerData,
    type: data.sellerData.type!!.name 
  };

  return {
    ...data.selectionData,
    ...sellerData
  }
};

