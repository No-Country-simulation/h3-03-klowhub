import { useContext } from "react";
import { CourseCtx } from "../context/course-form.context";

const useCourseContext = () => {
  const courseContext = useContext(CourseCtx);
  const { state, dispatch, submitCourse } = courseContext

  return { state, dispatch, submitCourse }
};

export default useCourseContext
