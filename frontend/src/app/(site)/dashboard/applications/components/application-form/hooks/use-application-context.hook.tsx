import { useContext } from "react";
import { ApplicationCtx } from "../context/application-form.context";

const useApplicationContext = () => {
  const applicationCtx = useContext(ApplicationCtx);
  if (!applicationCtx) throw new Error("no context found");
  const { state, dispatch, submitApplication } = applicationCtx

  return { state, dispatch, submitApplication }
};

export default useApplicationContext
