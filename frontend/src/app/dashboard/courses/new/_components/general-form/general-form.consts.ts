import { CourseInfo } from "@/types/courses.types";

export const initialState: CourseInfo = {
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

