import { FlatPromotion, Promotion, TVideo } from "./global.types";
import { Platform, TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";
import { AuthorInfo } from "./global.types";
import { BTEntity } from "./utils.types";
import { RecursiveNonNullable } from "./utils.types";
import { BTUser } from "./user.types";

export type ApplicationInfo = {
  title: string
  shortDescription: string
  platform: Platform | null
  language: SelectOption
  sector: SelectOption[]
  functionalities: SelectOption[]
  toolsAndPlatforms: SelectOption[]
  tags: SelectOption[]
};

export type ApplicationDetails = {
  features: string[]
  targetAudience: string[]
  fullDescription: string
  views: string[]
  appIncludes: string[]
  price: number
}

export type ApplicationMedia = {
  coverImg: TImage | null
  desktopLink: string 
  mobileLink: string
  assets: (TImage | TVideo)[]
}

export type ApplicationFormData = {
  general: ApplicationInfo
  details: ApplicationDetails
  media: ApplicationMedia
  promotion: Promotion | null
}

export type ValidatedApplicationForm = RecursiveNonNullable<Omit<ApplicationFormData, "promotion">> & { promotion: Promotion | null }

export type BTApplication = 
  & BTEntity<ApplicationInfo & ApplicationDetails & Omit<ApplicationMedia, "coverImg" | "assets">>
  & {
    id?: string,
    userId?: string,
    author?: BTUser
    promotion: FlatPromotion | null
  }

export type ApplicationWithFullImgs = BTApplication & {
  coverImg: TImage
  assets: (TImage | TVideo)[]
  author?: BTUser
}

export type ApplicationWithReducedImgs = BTApplication & {
  coverImg: string
  assets: string[]
}

export type ApplicationWithAuthor = Omit<ApplicationWithFullImgs, "author"> & { author: AuthorInfo }
