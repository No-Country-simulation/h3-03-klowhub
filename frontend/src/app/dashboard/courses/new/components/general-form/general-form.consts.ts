import { CourseInfo } from "@/types/courses.types";

export const COURSE_INFO_INITIAL_STATE: CourseInfo = {
  title: "",
  freeCourse: false,
  contentType: null,
  shortDescription: "",
  courseDifficulty: null,
  platform: null,
  language: { name: "español", label: "Español"},
  sector: [],
  coreContent: [],
  toolsAndPlatforms: [],
  functionalities: [],
  tags: [],
  price: 0,
  targetAudience: ""
};

