"use client"

import { useCallback, createContext, ReactNode, Dispatch } from "react"
import { Course, CourseFormData } from "@/types/courses.types";
import { useReducer } from "react";
import courseFormReducer, { COURSE_FORM_INITIAL_STATE } from "./course-form.reducer";
import { CourseFormActions, setDetailsData } from "./course-form.actions";
import { useEffect } from "react";
import { breakCourse, groupCourse } from "./course-form.acl";
import { useParams } from "next/navigation";
import { setGeneralData, setModulesData, setPromotionData } from "./course-form.actions";

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
  const params = useParams();
  const courseId = params.id;

  const submitCourse = useCallback(async (additionalData = {}) => {
    const formattedData = breakCourse({ ...state, ...additionalData });
    console.log('creating course...', formattedData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_COURSES_URL}/createCourse`, { 
      method: 'post',
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json"
      }
    });   

    const createdCourse: Course = await res.json();
    console.log('createdCourse: ', createdCourse);

    return createdCourse.id as string


  }, [state]);

  useEffect(() => {
    (async function () {
      try {
        if (!courseId) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSES_URL}/${courseId}`);
        const courseData = await res.json();
        console.log('courseData: ', courseData);
        const groupedCourse = groupCourse(courseData);

        dispatch(setGeneralData(groupedCourse.general))
        dispatch(setDetailsData(groupedCourse.details))
        dispatch(setModulesData(groupedCourse.modules))
        dispatch(setPromotionData(groupedCourse.promotion))
      } catch (err) {
        console.error("there was an error while getting course data: ", err)
      }
    })()
  }, [courseId])

  useEffect(() => { console.log('state', state) }, [state])

  return (
    <CourseCtx.Provider value={{ state, dispatch, submitCourse }}>{children}</CourseCtx.Provider>
  )
};

export default CourseCtxProvider