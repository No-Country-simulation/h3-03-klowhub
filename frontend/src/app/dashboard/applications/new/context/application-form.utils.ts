import { ApplicationFormData } from "@/types/application.types";

export const prepareApplicationData = (data: ApplicationFormData) => {

  const generalWithoutLabels = {
    ...data.general,
    sector: data.general.sector.map(s => s.name),
    functionalities: data.general.functionalities.map(f => f.name),
    toolsAndPlatforms: data.general.toolsAndPlatforms.map(t => t.name),
    language: data.general.language.name
  };

  return {
    ...data,
    ...generalWithoutLabels,
    ...data.media,
    promotion: data.promotion ? {
      ...data.promotion,
      percentage: data.promotion?.percentage / 100
    } : null
  }
};
