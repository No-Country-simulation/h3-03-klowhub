"use client"

import ReactDOM from "react-dom";

import { Dispatch, SetStateAction, useContext, useRef } from "react";
import { IsClientCtx } from "@/contexts/is-client.context";
import { X } from "lucide-react";
import useClickOutside from "@/hooks/use-click-outside.hook";
import useDisableScrolling from "@/hooks/use-disable-scrolling.hook";


type FilterModalProps = {
  setShowFilters: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode[]
}

const FilterModal = ({ setShowFilters, children }: FilterModalProps) => {
  const isClient = useContext(IsClientCtx);
  const modalRoot = isClient ? document.getElementById("modal-root") : null;
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowFilters(false))
  useDisableScrolling(document.body)

  return modalRoot ? ReactDOM.createPortal(
    <>
      <div className="cursor-pointer fixed w-screen h-screen bg-black opacity-70 top-0"></div>
      <div ref={ref} className={"w-full sm:w-auto bg-custom-gradient py-6 px-3 top-0 right-0 fixed h-dvh z-[99999] text-white flex flex-col items-end gap-5"}>
        <button 
          className="mr-5"
          onClick={() => setShowFilters(false)}
        >
          <X />
        </button>
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-5 px-3 w-full h-full overflow-scroll"}>
          { children }
        </div>
      </div>
    </>,
    modalRoot
  ) : ""
};

export default FilterModal
