import { Dispatch, useContext } from "react";
import { CourseCtx } from "../context/course-form.context";
import { CourseFormData } from "@/types/courses.types";
import { CourseFormActions } from "../context/course-form.actions";

type Return = {
  state: CourseFormData
  dispatch: Dispatch<CourseFormActions>
  submit: (data: CourseFormData) => void
}

const useCourseContext = (): Return => {
  const courseContext = useContext(CourseCtx);
  if (!courseContext) throw new Error("no context found");
  const { state, dispatch, submit } = courseContext

  return { state, dispatch, submit }
};

export default useCourseContext
