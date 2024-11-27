import { useContext } from "react";
import { CourseCtx } from "../context/course-form.context";

const useCourseContext = () => {
  const courseContext = useContext(CourseCtx);
  return courseContext
};

export default useCourseContext
