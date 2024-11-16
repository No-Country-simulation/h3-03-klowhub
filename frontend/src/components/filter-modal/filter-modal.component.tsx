"use client"

import ReactDOM from "react-dom";

import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside.hook";


type FilterModalProps = {
  setShowFilters: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode[]
}

const FilterModal = ({ setShowFilters, children }: FilterModalProps) => {
  const isClient = useContext(IsClientCtx);
  const modalRoot = isClient ? document.getElementById("modal-root") : null;
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowFilters(false))

  useEffect(() => {
    document.body.classList.add("overflow-hidden")
    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [])

  return modalRoot ? ReactDOM.createPortal(
    <>
      <div className="cursor-pointer fixed w-screen h-screen bg-black opacity-70 top-0"></div>
      <div ref={ref} className={"bg-custom-gradient py-6 px-3 top-0 right-0 fixed h-dvh z-[99999] text-white flex flex-col items-end gap-5"}>
        <button 
          className="mr-5"
          onClick={() => setShowFilters(false)}
        >
          <X />
        </button>
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 px-3 h-full overflow-scroll"}>
          { children }
        </div>
      </div>
    </>,
    modalRoot
  ) : ""
};

export default FilterModal
