// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { Language, Platform, Video } from "./global.types"

type ContentType = "course" | "lesson"
type Level = "basic" | "intermediate"
type Resource = {
  filename: string
  mimetype: string
}

export type CourseInfo = {
  title: string
  freeCourse: boolean
  contentType: ContentType
  about: string
  level: Level
  platform: Platform
  language: Language
  sector: string 
  coreContent: string
  tools: string[]
  functionalities: string[]
  tags: string[]
};

export type CourseDetails = {
  learningSubjects: string
  prevRequirements: string
  courseContent: string
  coverImg: string
}

export type Lesson = {
  title: string
  description: string
  videos: Video[]
  resources: Resource[]
}

export type Module = {
  title: string
  description: string
  lessons: Lesson[]
}

export type Course = {
  generalInfo: CourseInfo
  details: CourseDetails
  modules: Module[]
}
