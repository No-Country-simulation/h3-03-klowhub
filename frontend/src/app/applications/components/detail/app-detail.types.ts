import { TDocument, TImage, TVideo } from "@/types/global.types";
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

    // mobileScreenshot: TImage
    //
    // desktopScreenshot: TImage
    
    sector: string[];
  assets: (TImage | TVideo | TDocument)[]

    coreContent?: string[];

    toolsAndPlatforms: string[];

    functionalities: string[];

    appIncludes: string[];

    children: ReactNode[];
  submitApplication?: () => Promise<string>
}

export type AppDetailHeader = {
    title: string
    shortDescription: string
    rating?: number
    ratingCount?: number
    coverImg: TImage
  assets: (TImage | TVideo | TDocument)[]
}

export type AppIncludeProps = {
    title: string
    appIncludes: string[]
}
