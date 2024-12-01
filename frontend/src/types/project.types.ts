import { TVideo, Resource, Language, Platform } from "./global.types";
import { TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";

export type ProjectInfo = {
  title: string
  shortDescription: string
  language: Language | null
  platform: Platform | null
  methodology: SelectOption | null
  experienceLevel: SelectOption | null
  sector: SelectOption | null
};

export type ProjectDetails = {
  days: number
  budget: number
  requiredKnowledge: SelectOption[]
  assets: (TImage | TVideo | Resource)[]
}

export type ProjectFormData = {
  id?: string | null
  general: ProjectInfo
  details: ProjectDetails
}

export type Project = ProjectInfo & ProjectDetails

