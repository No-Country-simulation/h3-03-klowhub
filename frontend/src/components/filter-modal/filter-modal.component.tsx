"use client"

import ReactDOM from "react-dom";

import { Dispatch, SetStateAction, useRef, useEffect } from "react";
import { X } from "lucide-react";
import useDisableScrolling from "@/hooks/use-disable-scrolling.hook";
import useClickOutside from "@/hooks/use-click-outside.hook";
import { useDimensions } from "@/hooks/use-dimensions.hook";


type FilterModalProps = {
  showFilters: boolean
  setShowFilters: Dispatch<SetStateAction<boolean>>
  children: React.ReactNode[]
}

const FilterModal = ({ setShowFilters, children, showFilters }: FilterModalProps) => {
  const modalRoot = document.getElementById("modal-root") 
  const body = document.body 
  const ref = useRef<HTMLDivElement>(null);

  useDisableScrolling(body, showFilters)
  useClickOutside(ref, () => setShowFilters(false))
  const { width } = useDimensions(ref, modalRoot);

  useEffect(() => {
    if (!ref.current) return;
    if (showFilters) {
      ref.current.style.right = "0px"
    } else {
      ref.current.style.right = `-${width}px`
    };;
  }, [showFilters, width])

  return modalRoot ? ReactDOM.createPortal(
    <>
      <div className={`
        ${showFilters ? "pointer-events-auto opacity-70" : "pointer-events-none opacity-0"}
        cursor-pointer fixed w-screen h-screen bg-black top-0 ease-in-out duration-500
        `}
      />

      <div ref={ref} className={`
        right-[-99999px] w-full bg-custom-gradient py-6 px-3 top-0 right-0 fixed h-dvh z-[99999] text-white flex flex-col items-end gap-5 ease-in-out duration-500
        sm:w-auto 
      `}>
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
