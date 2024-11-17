import { useEffect } from "react";

const useDisableScrolling = (elem: HTMLElement | null, condition: boolean) => {
  useEffect(() => {
    if (!elem) return;
    if (condition) {
      elem.classList.add("overflow-hidden")
    } else {
      elem.classList.remove("overflow-hidden")
    };
  }, [elem, condition])
};

export default useDisableScrolling
