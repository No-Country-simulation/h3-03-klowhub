import { TImage } from "@/types/global.types";
import { ReactNode } from "react";
import { platform } from '../../../../consts/filters.consts';

export type AppProps = {
    name: string
    shortDescription: string
    fullDescription: string
    rating?: number
    ratingCount?: number
    // advantages: string[]
    coverImg: TImage

    // peechTitle: string

    // peechDescription: string
    platform: string

    mobileScreenshoot: TImage

    desktopScreenshot: TImage
    
    sector: string[];

    coreContent?: string[];

    toolsAndPlatforms: string[];

    functionalities: string[];

    appIncludes: string[];

    children: ReactNode[];
}

export type AppDetailHeader = {
    title: string
    shortDescription: string
    rating?: number
    ratingCount?: number
    coverImg: TImage
}

export type AppIncludeProps = {
    title: string
    appIncludes: string[]
}
