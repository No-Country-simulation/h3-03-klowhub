import { Platform } from "@/types/global.types";
import { ValidatedProjectForm, ProjectFormData, ProjectWithReducedImgs, ProjectWithFullImgs } from "@/types/project.types";

// @ts-ignore: Unreachable code error
export function breakProject (data: ValidatedProjectForm, reduceImgs: true): ProjectWithReducedImgs
export function breakProject (data: ValidatedProjectForm, reduceImgs: false): ProjectWithFullImgs
export function breakProject (data: ValidatedProjectForm, reduceImgs = false) {
  const { general: { sector, methodology, experienceLevel, platform, tags }, details: { requiredSkills, assets } } = data;

  const general = {
    ...data.general,
    sector: sector.map(s => s.name),
    platform: platform as Platform,
    methodology: methodology?.name || "",
    experienceLevel: experienceLevel?.name || "",
    requiredSkills: requiredSkills.map(sk => sk.name),
    tags: tags.map(t => t.name)
  };

  const details = {
    ...data.details,
    requiredSkills: requiredSkills.map(sk => sk.name),
    assets: reduceImgs ? assets.map(ast => ast.id) : assets
  };

  const formattedData = {
    ...general,
    ...details,
  };

  return formattedData
};

export const groupProject = (data: ProjectWithFullImgs): ProjectFormData => {
  const general = {
    title: data.title,
    description: data.description,
    platform: data.platform as Platform,
    methodology: { name: data.methodology, label: data.methodology },
    experienceLevel: { name: data.experienceLevel, label: data.experienceLevel },
    sector: data.sector.map(s => ({ name: s, label: s })),
    tags: data.tags.map(t => ({ name: t, label: t }))
  };   

  const details = {
    days: data.days,
    minBudget: data.minBudget,
    maxBudget: data.maxBudget,
    technicalRequirements: data.technicalRequirements,
    requiredSkills: data.requiredSkills.map(s => ({ name: s, label: s })),
    additionalRequirements: data.additionalRequirements,
    assets: data.assets
  };

  return {
    general,
    details
  }
};
