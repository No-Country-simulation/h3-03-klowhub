import { useEffect } from "react";

const useDisableScrolling = (elem: HTMLElement) => {
  useEffect(() => {
    elem.classList.add("overflow-hidden")
    return () => {
      elem.classList.remove("overflow-hidden")
    }
  }, [elem])
};

export default useDisableScrolling
