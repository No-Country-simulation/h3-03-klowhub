import { IsClientCtx } from "./is-client.context";
import { useContext } from "react";

const useIsClientCtx = () => {
  const isClientCtx = useContext(IsClientCtx);
  return isClientCtx
};

export default useIsClientCtx
