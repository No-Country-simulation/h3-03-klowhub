import { useEffect } from "react";

const useDisableScrolling = (selector: string) => {
  useEffect(() => {
    const elem = document.querySelector(selector) 
    if (!elem) return;
    elem.classList.add("overflow-hidden")

    return () => {
      elem.classList.remove("overflow-hidden")
    }
  }, [selector])
};

export default useDisableScrolling
