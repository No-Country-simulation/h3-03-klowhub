import { SelectOption } from "@/components/input/input.types"
import { RequiredProperty } from "./utils.types"

export type Tier = "starter" | "professional" | "expert"

export type SelectionData = {
  tier: Tier | null
}

export type SellerData = {
  type: SelectOption | null
}

export type MembershipFormData = {
  selectionData: SelectionData,
  sellerData: SellerData
}

export type Membership = RequiredProperty<
  & SelectionData
  & SellerData
>
