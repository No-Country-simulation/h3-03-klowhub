import { CourseFormData } from "@/types/courses.types";

export const cleanSelectedOptions = (data: CourseFormData) => {
  const { general: { sector, coreContent, tools, functionalities, language } } = data;

  const formattedData = {
    ...data,
    general: {
      ...data.general,
      language: language.name,
      sector: sector.map(s => s.name),
      coreContent: coreContent.map(c => c.name),
      tools: tools.map(t => t.name),
      functionalities: functionalities.map(f => f.name)
    }
  };

  return formattedData
};
