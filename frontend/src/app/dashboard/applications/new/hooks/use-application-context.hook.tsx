import { Dispatch, useContext } from "react";
import { ApplicationCtx } from "../context/application-form.context";
import { ApplicationFormData } from "@/types/application.types";
import { ApplicationFormActions } from "../context/application-form.actions";

const useApplicationContext = () => {
  const applicationCtx = useContext(ApplicationCtx);
  if (!applicationCtx) throw new Error("no context found");
  const { state, dispatch, submit } = applicationCtx

  return { state, dispatch, submit }
};

export default useApplicationContext
