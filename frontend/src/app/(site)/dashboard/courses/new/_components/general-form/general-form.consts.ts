import { CourseInfo } from "@/types/courses.types";

export const COURSE_INFO_INITIAL_STATE: CourseInfo = {
  title: "",
  freeCourse: false,
  contentType: "course",
  about: "",
  level: "basic",
  platform: "appsheet",
  language: "spanish",
  sector: "industria",
  coreContent: "databases",
  tools: [ "machine-learning" ],
  functionalities: [ "gestión-de-usuarios" ],
  tags: [ "databases", "ai" ],
};

