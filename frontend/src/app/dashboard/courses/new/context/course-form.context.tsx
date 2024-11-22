"use client"

import { useEffect, createContext, ReactNode, useState, Dispatch, SetStateAction } from "react"
import { Course } from "@/types/courses.types";
import { COURSE_FORM_INITIAL_STATE } from "./course-form.consts";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type CourseCtxProps = {
  courseData: Course
  setCourseData: Dispatch<SetStateAction<Course>> | undefined
  routeChanger: ((direction: "prev" | "next") => void) | undefined
}

type Props = {
  children: ReactNode[]
}

const routes = [ "general", "details", "modules", "promotions" ];

export const CourseCtx = createContext<CourseCtxProps>({
  courseData: COURSE_FORM_INITIAL_STATE,
  setCourseData: undefined,
  routeChanger: undefined
});

const CourseCtxProvider = ({ children }: Props) => {
  const [ courseData, setCourseData ] = useState<Course>(COURSE_FORM_INITIAL_STATE);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get("section");
  const current = routes.findIndex(r => r === section);
  const router = useRouter();

  const routeChanger = (direction: "prev" | "next") => {
    if (direction === "next") router.replace(`${pathname}?section=${routes[current + 1]}`)
    if (direction === "prev") router.replace(`${pathname}?section=${routes[current - 1]}`)
  }

  useEffect(() => {
    console.log('courseData: ', courseData);
  }, [courseData])

  return (
    <CourseCtx.Provider value={{ courseData, setCourseData, routeChanger }}>{ children }</CourseCtx.Provider>
  )
};

export default CourseCtxProvider
