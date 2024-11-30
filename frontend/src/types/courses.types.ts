// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { Language, Platform, TImage } from "./global.types"
import { CourseDificulty, Sectors, Funcionalitites, ToolsAndPlatforms, CoreContent, ContentType, AccessType } from "@/consts/filters.types";
import { SelectOption } from "@/components/input/input.types";
import { Promotion } from "./global.types";


type Resource = {
  filename: string
  mimetype: string
}

export type Link = {
  url: string
  name: string
}

export type CourseInfo = {
  title: string
  freeCourse: AccessType | null
  contentType: ContentType | null
  about: string
  level: CourseDificulty | null
  platform: Platform | null
  language: SelectOption
  sector: SelectOption[]
  coreContent: SelectOption[]
  tools: SelectOption[]
  functionalities: SelectOption[]
  tags: string[]
  price: number // this is not included in the design but I need to get this info from somewhere
  targetAudience: string
};

export type CourseDetails = {
  learningSubjects: string[]
  prevRequirements: string[]
  courseContent: string
  coverImg: TImage | null
}

export type Lesson = {
  id?: string
  title: string
  description: string
  video: File
  resources: Resource[]
  link: string
  free: boolean
}

export type Module = {
  title: string
  description: string
  lessons: Lesson[]
}

export type PromotedProduct = {
  type: "application" | "course" | ""
  id: number
}

export type Feedback = {
  rating: number
  ratingCount: number
  reviews: string[]
}

export type CourseFormData = {
  id: number | null
  general: CourseInfo
  details: CourseDetails
  modules: Module[]
  promotion: Promotion | null
}

export type Course = CourseInfo & CourseDetails & Promotion & Feedback & { modules: Module[] }
