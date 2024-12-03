import { CourseInfo } from "@/types/courses.types";

export const COURSE_INFO_INITIAL_STATE: CourseInfo = {
  title: "",
  freeCourse: null,
  contentType: null,
  shortDescription: "",
  level: null,
  platform: null,
  language: { name: "español", label: "Español"},
  sector: [],
  coreContent: [],
  tools: [],
  functionalities: [],
  tags: [],
  price: 0,
  targetAudience: ""
};

