import { Course, CourseFormData } from "@/types/courses.types";

export const breakCourse = (data: CourseFormData): Course => {
  const { general: { tags, sector, coreContent, toolsAndPlatforms, functionalities, language } } = data;

  const general = {
    ...(data.id && { id: data.id }),
    ...data.general,
    language: language.name,
    sector: sector.map(s => s.name),
    coreContent: coreContent.map(c => c.name),
    toolsAndPlatforms: toolsAndPlatforms.map(t => t.name),
    functionalities: functionalities.map(f => f.name),
    tags: tags.map(t => t.name),
  };

  const promotion = data.promotion ? {
    ...data.promotion.product,
    percentage: data.promotion.percentage / 100
  } : null;

  const formattedData = {
    ...general,
    ...data.details,
    modules: data.modules,
    promotion
  };

  console.log('formattedData: ', formattedData);

  return formattedData
};
