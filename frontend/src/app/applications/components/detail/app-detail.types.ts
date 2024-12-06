import { TImage } from "@/types/global.types";
import { ReactNode } from "react";
import { platform } from '../../../../consts/filters.consts';

export type AppProps = {
    title: string
    shortDescription: string
    fullDescription: string
    rating?: number
    ratingCount?: number
    advantages: string[]
    coverImg: {
        url: string
        size: number
        width: number
        height: number
        format: string
        created_at: string
    }

    peechTitle: string

    peechDescription: string
    platform: string

    mobileScreenshoot: TImage

    desktopScreenshot: TImage
    
    sector: string[];

    coreContent?: string[];

    toolsAndPlatform: string[];

    functionalities: string[];

    appIncludes: string[];

    children: ReactNode[];
}

export type AppDetailHeader = {
    title: string
    shortDescription: string
    rating?: number
    ratingCount?: number
    coverImg: {
        url: string
        size: number
        width: number
        height: number
        format: string
        created_at: string
    }
}

export type AppIncludeProps = {
    title: string
    appIncludes: string[]
}