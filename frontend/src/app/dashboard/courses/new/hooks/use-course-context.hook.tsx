import { Dispatch, useContext } from "react";
import { CourseCtx } from "../context/course-form.context";
import { CourseFormData } from "@/types/courses.types";
import { CourseFormActions } from "../context/course-form.actions";

const useCourseContext = (): [ CourseFormData, Dispatch<CourseFormActions> ] => {
  const courseContext = useContext(CourseCtx);
  if (!courseContext) throw new Error("no context found");
  const { state, dispatch } = courseContext

  return [ state, dispatch ]
};

export default useCourseContext
