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
  state: CourseFormData
  dispatch: Dispatch<CourseFormActions>
  submit: (data: CourseFormData) => void
}

const submit = async (data: CourseFormData) => {
  const { general, details, modules, promotion, id } = data;

  const destructured = { ...general, ...details, modules, promotion, id };
  destructured.coverImg = destructured.coverImg[0]

  const formData = new FormData();
  for (const key in destructured) {
    formData.append(key, destructured[key])
  }
  const res = await fetch('http://localhost:3003/courses', { 
    method: 'post',
    body: formData,
  });   

  const createdCourse = await res.json();
  console.log('createdCourse: ', createdCourse);
};

export const CourseCtx = createContext<CourseCtxType | undefined>(undefined)

const CourseCtxProvider = ({ children }: Props) => {
  const [ state, dispatch ] = useReducer(courseFormReducer, COURSE_FORM_INITIAL_STATE);

  useEffect(() => { console.log('state', state) }, [ state ])

  return (
    <CourseCtx.Provider value={{ state, dispatch, submit }}>{ children }</CourseCtx.Provider>
  )
};

export default CourseCtxProvider
