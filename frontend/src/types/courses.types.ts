// TODO: implement strict type, for this we first need internationalization added
// for example "coreContent" is not just a string but a very specific set of posible strings

import { RecursiveNonNullable } from "./utils.types";
import { Platform, TImage, TVideo, TDocument, AuthorInfo, FlatPromotion } from "./global.types"
import { CourseDificulty, ContentType } from "@/consts/filters.types";
import { SelectOption } from "@/components/input/input.types";
import { Promotion, Rating } from "./global.types";
import { TReview } from "@/components/shared/reviews/review.types";
import { BTEntity, Expand, RequiredProperty } from "./utils.types";
import { BTUser } from "./user.types";


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
  courseIncludes: string[]
  fullDescription: string
  coverImg: TImage | null
  promotionalVideo: TVideo | null
  price: number
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

export type ValidatedCourseForm = RecursiveNonNullable<Omit<CourseFormData, "promotion">> & { promotion: Promotion | null }

export type CoursePayload = {
  id: number | null
  modules: CourseFormData["modules"]
  promotion: CourseFormData["promotion"]

} & CourseFormData["general"] & CourseFormData["details"]

type Course = 
  & CourseInfo
  & CourseDetails
  & { modules: Module[] }
  & { promotion: Promotion | null }

export type BTCourse = 
  & BTEntity<Omit<Course, "modules" | "coverImg" | "promotionalVideo">>
  & { id: string }

export type CourseWithReducedAssets = BTCourse & {
  modules: (Omit<Module, "lessons"> & (BTEntity<Omit<Lesson, "video" | "link">> & { video: string | null, link: string | null })[])[]
  coverImg: string
  promotionalVideo: string
}

export type CourseWithFullAssets = BTCourse & {
  modules: Module[]
  coverImg: TImage
  promotionalVideo: TVideo
  author: Required<BTUser>
}

// type CourseOptionalFields = Partial<{
//   id?: string,
//   reviews?: TReview[]
//   author?: AuthorInfo
// } & Rating>

// export type Course = RequiredProperty<
//   & Omit<CourseInfo, "sector" | "coreContent" | "toolsAndPlatforms" | "functionalities" | "tags" | "language"> 
//   & CourseDetails
//   & {
//   sector: string[]
//   coreContent: string[]
//   toolsAndPlatforms: string[]
//   functionalities: string[]
//   tags: string[]
//   language: string
//   promotion: FlatPromotion | null
//   modules: Module[]
// }> & CourseOptionalFields
