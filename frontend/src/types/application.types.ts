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
  // advantages: string
  features: string[]
  targetAudience: string[]
  fullDescription: string
  views: string[]
  appIncludes: string[]
}

export type ApplicationMedia = {
  coverImg: TImage | null
  // desktopScreenshot: TImage | null
  // mobileScreenshot: TImage | null
  desktopLink: string 
  mobileLink: string
  assets: (TImage | TVideo)[]
}

export type ApplicationFormData = {
  id?: string | null
  general: ApplicationInfo
  details: ApplicationDetails
  media: ApplicationMedia
  promotion: Promotion | null
}

type ApplicationOptionalFields = Partial<{
  id?: string,
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
