import { ProjectFormData, Project } from "@/types/project.types";

export const breakProject = (data: ProjectFormData): Project | void=> {
  const { general: { sector, methodology, experienceLevel }, details: { requiredSkills }, userId } = data;
  if (!methodology) return console.error("methodology is null");
  if (!experienceLevel) return console.error("experienceLevel is null");

  const general = {
    ...data.general,
    sector: sector.map(s => s.name),
    methodology: methodology.name,
    experienceLevel: experienceLevel.name,
    requiredSkills: requiredSkills.map(sk => sk.name)
  };

  const details = {
    ...data.details,
    requiredSkills: requiredSkills.map(sk => sk.name)
  };

  const formattedData = {
    userId,
    ...general,
    ...details,
  };

  // console.log('formattedData: ', formattedData);

  // @ts-ignore: Unreachable code error
  return formattedData
};

export const groupProject = (data: Project): ProjectFormData => {
  const general = {
    title: data.title,
    description: data.description,
    platform: data.platform,
    methodology: data.methodology,
    experienceLevel: data.experienceLevel,
    sector: data.sector.map(s => ({ name: s, label: s }))
  };   

  const details = {
    days: data.days,
    minBudget: data.minBudget,
    maxBudget: data.maxBudget,
    technicalRequirements: data.technicalRequirements.map(t => ({ name: t, label: t })),
    requiredSkills: data.requiredSkills.map(s => ({ name: s, label: s })),
    additionalRequirements: data.additionalRequirements.map(r => ({ name: r, label: r })),
    assets: data.assets
  };

  return {
    general,
    details
  }
};
