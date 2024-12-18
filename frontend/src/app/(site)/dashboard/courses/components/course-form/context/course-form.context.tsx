"use client"

import { useParams } from "next/navigation";
import { useReducer, useEffect, useCallback, createContext, ReactNode, Dispatch } from "react"

import useStore from "@/contexts/store/use-store.hook";
import courseFormReducer, { COURSE_FORM_INITIAL_STATE } from "./course-form.reducer";
import { breakCourse, groupCourse } from "./course-form.acl";
import { CourseFormActions, setDetailsData } from "./course-form.actions";
import { setGeneralData, setModulesData, setPromotionData } from "./course-form.actions";

import { User } from "@/contexts/store/store.types";
import { CourseWithFullAssets, CourseFormData } from "@/types/courses.types";

type Props = {
  children: ReactNode[]
}

type CourseCtxType = {
  state: CourseFormData
  dispatch: Dispatch<CourseFormActions>
  submitCourse: (additionalData?: object) => Promise<string | undefined>
}

export const CourseCtx = createContext<CourseCtxType>({
  state: COURSE_FORM_INITIAL_STATE,
  dispatch: () => {},
  submitCourse: async () => undefined,
})

const CourseCtxProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(courseFormReducer, COURSE_FORM_INITIAL_STATE);
  const params = useParams();
  const courseId = params.id;
  const [ user ] = useStore<User>("user");

  const submitCourse = useCallback(async (additionalData = {}) => {
    const formattedData = breakCourse({ ...state, ...additionalData }, true);
    console.log('creating course...', formattedData);
    
    const createEndpoint = `${process.env.NEXT_PUBLIC_COURSES_URL}/user/${user.id}`;
    const editEndpoint = `${process.env.NEXT_PUBLIC_COURSES_URL}/${courseId}`;

    const res = await fetch(courseId ? editEndpoint : createEndpoint, { 
      method: courseId ? 'put' : 'post',
      body: JSON.stringify(formattedData),
      headers: {
        "Content-Type": "application/json"
      }
    });   

    const createdCourse: CourseWithFullAssets = await res.json();
    console.log('createdCourse: ', createdCourse);

    return createdCourse.id


  }, [state, courseId, user.id]);

  useEffect(() => {
    (async function () {
      try {
        if (!courseId) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_COURSES_URL}/${courseId}`);
        const courseData = await res.json();
        const groupedCourse = groupCourse(courseData);
        console.log('groupedCourse: ', groupedCourse);

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
