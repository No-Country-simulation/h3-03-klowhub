import { FlatPromotion, Promotion, TVideo } from "./global.types";
import { Platform, TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";
import { TReview } from "@/components/shared/reviews/review.types";
import { AuthorInfo, Rating } from "./global.types";
import { RequiredProperty } from "./utils.types";

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

type ApplicationOptionalFields = Partial<{
  reviews?: TReview[]
  author?: AuthorInfo
} & Rating>

type ApplicationNullableFields = {
  promotion: FlatPromotion | null
}

export type Application = RequiredProperty<
  & Omit<ApplicationInfo, "language" | "sector" | "functionalities" | "toolsAndPlatforms" | "tags">
  & ApplicationDetails
  & ApplicationMedia>
  & ApplicationOptionalFields 
  & ApplicationNullableFields
  & {
    language: string
    sector: string[]
    functionalities: string[]
    toolsAndPlatforms: string[]
    tags: string[]
  }
