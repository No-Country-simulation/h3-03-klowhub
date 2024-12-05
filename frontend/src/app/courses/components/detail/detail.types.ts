import { Module } from "@/types/courses.types"
import { Promotion, TDocument, TImage, TVideo } from "@/types/global.types"

export type TCourseDetail = {
  id: string | null
    title: string
    shortDescription: string
    rating?: number
    ratingCount?: number
    promotionalVideo: TVideo
    available: boolean
    price: number
    platform: string
    learningSubjects: string[]
    sector: string[]
    coreContent: string[]
    toolsAndPlatforms: string[]
    functionalities: string[]
    prevRequirements: string[]
    fullDescription: string
    modules: Module[]
    promotion: Promotion | null,
    resource: TDocument[]
    targetAudience: string
    // where is this data?
    // additionalDetails: [
    //     { title: string, content: string },
    //     { title: string, content: string },
    // ],
}

export type GenericSection = {
  title: string 
  content: string
}
