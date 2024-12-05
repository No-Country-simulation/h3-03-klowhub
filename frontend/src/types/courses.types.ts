// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { Language, Platform, TImage, Resource, TVideo, TDocument } from "./global.types"
import { CourseDificulty, Sectors, Funcionalitites, ToolsAndPlatforms, CoreContent, ContentType, AccessType } from "@/consts/filters.types";
import { SelectOption } from "@/components/input/input.types";
import { Promotion } from "./global.types";


export type Link = {
  url: string
  name: string
}

export type CourseInfo = {
  title: string
  freeCourse: boolean
  language: SelectOption
  shortDescription: string
  contentType: ContentType | null
  courseDifficulty: CourseDificulty | null
  platform: Platform | null
  sector: SelectOption[]
  coreContent: SelectOption[]
  toolsAndPlatforms: SelectOption[]
  functionalities: SelectOption[]
  tags: SelectOption[]
  price: number // this is not included in the design but I need to get this info from somewhere
  targetAudience: string
};

export type Course = Omit<CourseInfo, "sector" | "coreContent" | "toolsAndPlatforms" | "functionalities"> & {
  id: string,
  sector: string[]
  coreContent: string[]
  toolsAndPlatforms: string[]
  functionalities: string[]
  tags: string[]
} & CourseDetails & Promotion & Feedback & { modules: Module[] }

export type CourseDetails = {
  learningSubjects: string[]
  prevRequirements: string[]
  fullDescription: string
  coverImg: TImage | null
  promotionalVideo: TVideo | null
}

export type Lesson = {
  id?: string
  title: string
  description: string
  video: TVideo | null
  documents: TDocument[]
  link: string | null
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

export type CoursePayload = {
  id: number | null
  modules: CourseFormData["modules"]
  promotion: CourseFormData["promotion"]

} & CourseFormData["general"] & CourseFormData["details"]

// export type Course = CourseInfo & CourseDetails & Promotion & Feedback & { modules: Module[] }
