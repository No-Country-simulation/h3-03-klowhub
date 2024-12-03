import { CourseFormData } from "@/types/courses.types";

export const prepareCourseData = (data: CourseFormData) => {
  const { general: { sector, coreContent, tools, functionalities, language } } = data;

  const general = {
    ...data.general,
    language: language.name,
    sector: sector.map(s => s.name),
    coreContent: coreContent.map(c => c.name),
    tools: tools.map(t => t.name),
    functionalities: functionalities.map(f => f.name)
  };

  const formattedData = {
    ...general,
    ...data.details,
    modules: data.modules,
    promotion: data.promotion ? {
      ...data.promotion,
      percentage: data.promotion?.percentage / 100
    } : null
  };

  return formattedData
};
