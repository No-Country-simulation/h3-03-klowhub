"use client"

import { useCallback, createContext, ReactNode, Dispatch } from "react"
import { Course, CourseFormData } from "@/types/courses.types";
import { useReducer } from "react";
import courseFormReducer, { COURSE_FORM_INITIAL_STATE } from "./course-form.reducer";
import { CourseFormActions } from "./course-form.actions";
import { useEffect } from "react";
import { breakCourse } from "./course-form.acl";

type Props = {
  children: ReactNode[]
}

type CourseCtxType = {
  state: CourseFormData
  dispatch: Dispatch<CourseFormActions>
  submitCourse: (additionalData?: object) => Promise<string>
}

export const CourseCtx = createContext<CourseCtxType | undefined>(undefined)

const CourseCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(courseFormReducer, COURSE_FORM_INITIAL_STATE);

  const submitCourse = useCallback(async (additionalData = {}) => {
    const { id, ...formattedData } = breakCourse({ ...state, ...additionalData });
    console.log('creating course...', formattedData);

    // const res = await fetch(`${process.env.NEXT_PUBLIC_COURSES_URL}/createCourse`, { 
    //   method: 'post',
    //   body: JSON.stringify(formattedData),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });   
    //
    // const createdCourse: Course = await res.json();
    // console.log('createdCourse: ', createdCourse);
    //
    // return createdCourse.id

    const temporaryId = "course-19u3-124-asdad";
    window.sessionStorage.setItem("courseForm", JSON.stringify(formattedData))
    console.log(window.sessionStorage.getItem("courseForm"));
    return temporaryId

  }, [state]);

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <CourseCtx.Provider value={{ state, dispatch, submitCourse }}>{children}</CourseCtx.Provider>
  )
};

export default CourseCtxProvider