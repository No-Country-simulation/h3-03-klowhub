import { useContext } from "react";
import { ApplicationCtx } from "../context/application-form.context";

const useApplicationContext = () => {
  const applicationCtx = useContext(ApplicationCtx);
  // if (!applicationCtx) return { state: undefined, dispatch: undefined, submitApplication: undefined }
  const { state, dispatch, submitApplication } = applicationCtx

  return { state, dispatch, submitApplication }
};

export default useApplicationContext
