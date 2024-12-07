import { FlatPromotion, PromotedProduct, Promotion, TVideo } from "./global.types";
import { Platform, TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";
import { TReview } from "@/components/shared/reviews/review.types";
import { AuthorInfo, Rating } from "./global.types";
import { RequiredProperty } from "./utils.types";

export type ApplicationInfo = {
  name: string
  shortDescription: string
  platform: Platform | null
  language: SelectOption
  sector: SelectOption[]
  functionalities: SelectOption[]
  toolsAndPlatforms: SelectOption[]
  target: string
  advantages: string
  tags: SelectOption[]
};

export type ApplicationMedia = {
  coverImg: TImage | null
  desktopScreenshot: TImage | null
  mobileScreenshoot: TImage | null
  desktopLink: string 
  mobileLink: string
  assets: (TImage | TVideo)[]
}

export type ApplicationFormData = {
  id?: string | null
  general: ApplicationInfo
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
  & ApplicationInfo 
  & ApplicationMedia 
> & ApplicationOptionalFields & ApplicationNullableFields
