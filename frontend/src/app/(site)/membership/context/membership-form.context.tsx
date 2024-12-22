"use client"

import { ReactNode, useReducer, useCallback, useEffect, Dispatch, createContext } from "react";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";
import { Membership, MembershipFormData } from "@/types/membership.types";
import { MembershipFormActions } from "./membership-form.actions";
import membershipFormReducer, { MEMBERSHIP_FORM_INITIAL_STATE } from "./membership-form.reducer";
import { breakMembership } from "./membership-form.acl";

type Props = {
  children: ReactNode[]
}

type MembershipCtxType = {
  state: MembershipFormData
  dispatch: Dispatch<MembershipFormActions>
  submitMembership: () => Promise<void>
}

export const MembershipCtx = createContext<MembershipCtxType | undefined>(undefined)

const MembershipCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(membershipFormReducer, MEMBERSHIP_FORM_INITIAL_STATE);
  const [ user ] = useStore<BTUser>("user");

  const submitMembership = useCallback(async () => {
    const formattedData = breakMembership({ ...state });
    console.log('creating course...', formattedData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_URL}/becomeseller/${user.id}`, { 
      method: 'post',
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json"
      }
    });   

    const createdCourse: Membership = await res.json();
    console.log('createdCourse: ', createdCourse);

  }, [state, user]);

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <MembershipCtx.Provider value={{ state, dispatch, submitMembership }}>{children}</MembershipCtx.Provider>
  )
};


export default MembershipCtxProvider
