import { TDocument, TImage, TVideo } from "@/types/global.types";
import { ReactNode } from "react";
import { TApplicationCtx } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.context";

export type AppProps = {
  title: string
  shortDescription: string
  fullDescription: string
  rating?: number
  ratingCount?: number
  coverImg: TImage
  platform: string
  sector: string[];
  assets: (TImage | TVideo | TDocument)[]
  coreContent?: string[];
  toolsAndPlatforms: string[];
  functionalities: string[];
  appIncludes: string[];
  children: ReactNode[];
  submitApplication?: TApplicationCtx["submitApplication"]
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
