import { TCourseDetail } from "@/app/courses/components/detail/detail.types";
import { CourseFormData, CoursePayload } from "@/types/courses.types";

// export const prepareCourseData = (data: CourseFormData): CoursePayload => {
//   const { general: { tags, sector, coreContent, toolsAndPlatforms, functionalities, language } } = data;
//
//   const general = {
//     ...data.general,
//     language: language.name,
//     sector: sector.map(s => s.name),
//     coreContent: coreContent.map(c => c.name),
//     toolsAndPlatforms: toolsAndPlatforms.map(t => t.name),
//     functionalities: functionalities.map(f => f.name),
//     tags: tags.map(t => t.name),
//   };
//
//   const formattedData = {
//     id: null,
//     ...general,
//     ...data.details,
//     modules: data.modules,
//     promotion: data.promotion ? {
//       ...data.promotion,
//       percentage: data.promotion?.percentage / 100
//     } : null
//   };
//   console.log('formattedData: ', formattedData);
//
//   return formattedData
// };

export const FDAdapter = (data: CourseFormData): TCourseDetail => {
  if (!data.details.coverImg) throw new Error("coverImg cannot be null");

  const { general: { tags, sector, coreContent, toolsAndPlatforms, functionalities, language } } = data;

  // I'm sending the labels just for now, after we implement internationalization we will have to use the values
  const general = {
    id: null,
    ...data.general,
    language: language.name,
    sector: sector.map(s => s.label),
    coreContent: coreContent.map(c => c.label),
    toolsAndPlatforms: toolsAndPlatforms.map(t => t.label),
    functionalities: functionalities.map(f => f.label),
    tags: tags.map(t => t.label),
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

  console.log('formattedData: ', formattedData);

  return formattedData
};
