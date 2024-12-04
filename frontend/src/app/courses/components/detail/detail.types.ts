import { Module } from "@/types/courses.types"
import { Promotion, TDocument, TImage, TVideo } from "@/types/global.types"

export type TCourseDetail = {
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

    toolsAndPlatform: string[]

    functionalities: string[]

    prevRequirements: string[]
    fullDescription: string

    modules: Module[]

    promotion: Promotion | null,

    resource: TDocument[]

    // where is this data?
    additionalDetails: [
        { title: string, content: string },
        { title: string, content: string },
    ],
}
