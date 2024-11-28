"use client"

import { createContext, ReactNode, Dispatch } from "react"
import { CourseFormData } from "@/types/courses.types";
import { useReducer } from "react";
import courseFormReducer, { COURSE_FORM_INITIAL_STATE } from "./course-form.reducer";
import { CourseFormActions } from "./course-form.actions";
import { useEffect } from "react";

type Props = {
  children: ReactNode[]
}

type CourseCtxType = {
  state: CourseFormData,
  dispatch: Dispatch<CourseFormActions>
}
export const CourseCtx = createContext<CourseCtxType | undefined>(undefined)

const CourseCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(courseFormReducer, COURSE_FORM_INITIAL_STATE);

  useEffect(() => { console.log('state', state) }, [ state ])

  return (
    <CourseCtx.Provider value={{ state, dispatch }}>{ children }</CourseCtx.Provider>
  )
};

export default CourseCtxProvider
