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

