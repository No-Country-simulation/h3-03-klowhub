import { PromotedProduct, Promotion, TVideo } from "./global.types";
import { Language, Platform, TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";

export type ApplicationInfo = {
  name: string
  summarizedDescription: string
  platform: Platform | null
  language: Language
  sector: SelectOption[]
  funcionalitites: SelectOption[]
  toolsAndPlatforms: SelectOption[]
  target: string
  advantages: string
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

export type Application = ApplicationInfo & ApplicationMedia & PromotedProduct
