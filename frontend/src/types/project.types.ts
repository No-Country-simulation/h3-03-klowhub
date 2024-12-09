import { TVideo, TDocument, Platform } from "./global.types";
import { TImage } from "./global.types"
import { SelectOption } from "@/components/input/input.types";

export type ProjectInfo = {
  title: string
  description: string
  // language: SelectOption | null
  platform: Platform | null
  methodology: SelectOption | null
  experienceLevel: SelectOption | null
  sector: SelectOption | null
};

export type ProjectDetails = {
  days: number
  minBudget: number
  maxBudget: number
  technicalRequirement: string[]
  requiredKnowledge: SelectOption[]
  requiredSkills: string[]
  assets: (TImage | TVideo | TDocument)[]
}

export type ProjectFormData = {
  id?: string | null
  userId: string
  general: ProjectInfo
  details: ProjectDetails
}

export type Project = ProjectInfo & ProjectDetails

export type ProjectCard = {
  id: number,
  img : {
    url: string,
      width: number,
      height: number,
      alt: string
  }
  description: string,
  platform : "PowerApps" | "AppSheet",
  tags: string[],
  rating: number,
  ratingCount: number,
  status: "En curso" | "Terminado",
  initialDate: string,
  finalDate: string,
}

