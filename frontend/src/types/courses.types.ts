// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { Platform, TImage, TVideo, TDocument, AuthorInfo, FlatPromotion } from "./global.types"
import { CourseDificulty, ContentType } from "@/consts/filters.types";
import { SelectOption } from "@/components/input/input.types";
import { Promotion, Rating } from "./global.types";
import { TReview } from "@/components/shared/reviews/review.types";
import { RequiredProperty } from "./utils.types";


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
  freeLesson: boolean
}

export type Module = {
  id?: string
  title: string
  description: string
  lessons: Lesson[]
}

export type PromotedProduct = {
  type: "application" | "course" | ""
  id: number
}

export type CourseFormData = {
  // id: string | null
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

type CourseOptionalFields = Partial<{
  id?: string,
  reviews?: TReview[]
  author?: AuthorInfo
} & Rating>

export type Course = RequiredProperty<
  & Omit<CourseInfo, "sector" | "coreContent" | "toolsAndPlatforms" | "functionalities" | "tags" | "language"> 
  & CourseDetails
  & {
  sector: string[]
  coreContent: string[]
  toolsAndPlatforms: string[]
  functionalities: string[]
  tags: string[]
  language: string
  promotion: FlatPromotion | null
  modules: Module[]
}> & CourseOptionalFields
