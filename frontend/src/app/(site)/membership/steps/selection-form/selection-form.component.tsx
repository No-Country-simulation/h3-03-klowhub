"use client"

import MembershipCard from "@/components/membership-card/membership-card.component";
import { useReducer } from "react";
import Input from "@/components/input/input.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { SelectionData } from "@/types/membership.types";
import { SELECTION_DATA_INITIAL_STATE } from "./selection-form.consts";
import membershipFormReducer, { MEMBERSHIP_FORM_INITIAL_STATE } from "../../context/membership-form.reducer";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setSelectionData } from "../../context/membership-form.actions";

type Tiers = "starter" | "professional" | "expert"
const tiers = [ "starter", "professional", "expert" ];

const SelectionForm = () => {
  const [state, dispatch] = useReducer(membershipFormReducer, MEMBERSHIP_FORM_INITIAL_STATE);
  const {
    controlledCommonProps,
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<SelectionData>(SELECTION_DATA_INITIAL_STATE, state.selectionData || SELECTION_DATA_INITIAL_STATE);

  return (
    <div className="bg-card p-6 flex gap-5">
      <div className="flex gap-5">
        {
          tiers.map((t, idx) => (
            <Input
              key={`product-option-${idx}`}
              type="product-selector"
              name="tier"
              productId={t}
              productType={"application"}
              {...controlledCommonProps}
            >
              <MembershipCard 
                key={`membership-${idx}`}
                tier={t as Tiers}
              />
            </Input>
          ))
        }
      </div>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn
          setter={handleSubmit(data => dispatch(setSelectionData(data)))}
          route="seller-info"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </div>
  )   
};

export default SelectionForm
