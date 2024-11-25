import { CourseInfo } from "@/types/courses.types";

export const COURSE_INFO_INITIAL_STATE: CourseInfo = {
  title: "",
  freeCourse: false,
  contentType: "curso",
  about: "",
  level: "basic",
  platform: "appsheet",
  language: "español",
  sector: "industria",
  coreContent: "databases",
  tools: [ "dropbox" ],
  functionalities: [ "gestión-de-usuarios" ],
  tags: [ "databases", "ai" ],
};

