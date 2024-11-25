// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { Language, Platform, TImage } from "./global.types"
import { CourseDificulty, Sectors, Funcionalitites, ToolsAndPlatforms, CoreContent, ContentType } from "@/consts/filters.types";


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
  freeCourse: boolean
  contentType: ContentType
  about: string
  level: CourseDificulty
  platform: Platform
  language: Language
  sector: Sectors 
  coreContent: CoreContent
  tools: ToolsAndPlatforms[]
  functionalities: Funcionalitites[]
  tags: string[]
  price: number // this is not included in the design but I need to get this info from somewhere
};

export type CourseDetails = {
  learningSubjects: string
  prevRequirements: string
  courseContent: string
  img: TImage | null
}

export type Lesson = {
  title: string
  description: string
  videos: File[]
  resources: Resource[]
  link: string
}

export type Module = {
  title: string
  description: string
  lessons: Lesson[]
}

export type CoursePromotion = {
  product: "application" | "course" | undefined
  id: number
  percentage: number
}

export type Feedback = {
  rating: number
  ratingCount: number
  reviews: string[]
}

export type CourseFormData = {
  id?: number
  general: CourseInfo
  details: CourseDetails
  modules: Module[]
  promotion: CoursePromotion | null
}

export type Course = CourseInfo & CourseDetails & CoursePromotion & Feedback & { modules: Module[] }
