import { CourseDetails } from "@/types/courses.types";

export const COURSE_DETAILS_INITIAL_STATE: CourseDetails = {
  learningSubjects: "",
  prevRequirements: "",
  courseContent: "",
  courseImg: {
    width: NaN,
    height: NaN,
    url: "",
    alt: ""
  }
};

