import { BTEntity } from "./utils.types";
import { TVideo, TDocument, Platform } from "./global.types";
import { TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";
import { BTSeller } from "./backend-responses.types";
import { BTUser } from "./user.types";
import { RecursiveNonNullable } from "./utils.types";

export type ProjectInfo = {
  title: string
  description: string
  // language: SelectOption | null
  platform: Platform | null
  methodology: SelectOption | null
  experienceLevel: SelectOption | null
  sector: SelectOption[]
  tags: SelectOption[]
};

export type ProjectDetails = {
  days: number
  minBudget: number
  maxBudget: number
  technicalRequirements: string[]
  requiredSkills: SelectOption[]
  additionalRequirements: string[]
  assets: (TImage | TVideo | TDocument)[]
}

export type ProjectFormData = {
  // userId: string
  general: ProjectInfo
  details: ProjectDetails
}

export type ValidatedProjectForm = RecursiveNonNullable<Omit<ProjectFormData, "promotion">>

export type BTProject = 
  & BTEntity<ProjectInfo & Omit<ProjectDetails, "assets">>
  & {
    id?: string,
    userId?: string,
    seller?: BTSeller
  }

export type ProjectWithReducedImgs = BTProject & {
  assets: string[]
}

export type ProjectWithFullImgs = BTProject & {
  assets: (TImage | TVideo | TDocument)[]
  author: BTUser
}

type TInstructorInfo = {
  name: string,
  img : {
    url: string,
      width: number,
      height: number,
      alt: string
  }
  userType?: string
  description: string
  rating: number
}

export type TProjectCard = {
  id: string,
  title: string,
  instructor: TInstructorInfo,
  description: string,
  platform : "PowerApps" | "AppSheet",
  tags: string[],
  rating: number,
  ratingCount: number,
  status: "en-curso" | "finalizado",
  // initialDate: string,
  // finalDate: string,
}

