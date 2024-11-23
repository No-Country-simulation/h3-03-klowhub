"use client"

import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

type Props<F, T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T, undefined>
  direction: "prev" | "next"
  keyToUpdate: keyof F
  routeChanger: ((direction: "prev" | "next") => void) | undefined
  setCourseData: Dispatch<SetStateAction<F>> | undefined
  isDirty?: boolean
}

const RouteBtn = <F, T extends FieldValues>({ 
  handleSubmit, 
  direction, 
  keyToUpdate, 
  routeChanger,
  setCourseData,
  isDirty
}: Props<F, T>) => {

  return (
    <button 
      type="button"
      className="right-0 px-14 self-end bg-primary-500 py-2 rounded-md" 
      onClick={ setCourseData ? handleSubmit(data => {
        if (isDirty) setCourseData(prev => ({ ...prev, [keyToUpdate]: data }))
        if (routeChanger) { routeChanger(direction) }
      }) : undefined}
    >
      { direction === "prev" ? "Retroceder" : "Continuar" }
    </button>
  )
};

export default RouteBtn
