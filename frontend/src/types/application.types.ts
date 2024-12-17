import { FlatPromotion, Promotion, TVideo } from "./global.types";
import { Platform, TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";
import { AuthorInfo } from "./global.types";
import { BTEntity } from "./utils.types";
import { BTAuthor, BTSeller } from "./backend-responses.types";
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

export type BTApplication = 
  & BTEntity<ApplicationInfo & ApplicationDetails & Omit<ApplicationMedia, "coverImg" | "assets">> & { promotion: Promotion | null }
  & {
    id?: string,
    userId?: string,
    author?: BTUser
    promotion: FlatPromotion
  }

export type ApplicationWithFullImgs = BTApplication & {
  coverImg: TImage
  assets: (TImage | TVideo)[]
}

export type ApplicationWithReducedImgs = BTApplication & {
  coverImg: string
  assets: string[]
}

export type ApplicationWithAuthor = Omit<ApplicationWithFullImgs, "author"> & { author: AuthorInfo }
