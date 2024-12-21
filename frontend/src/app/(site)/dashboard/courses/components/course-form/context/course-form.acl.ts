import { CourseWithFullAssets, CourseWithReducedAssets, CourseFormData } from "@/types/courses.types";
import { Platform } from "@/types/global.types";

// @ts-ignore: Unreachable code error
export function breakCourse (data: CourseFormData, reduceAssets: true): CourseWithReducedAssets 
export function breakCourse (data: CourseFormData, reduceAssets: false): CourseWithFullAssets
export function breakCourse (data: CourseFormData, reduceAssets = false) {
  const {
    general: { tags, sector, coreContent, toolsAndPlatforms, functionalities, language },
    details: { coverImg },
    modules
  } = data;

  const general = {
    ...data.general,
    platform: data.general.platform as Platform,
    language: language.name,
    sector: sector.map(s => s.name),
    coreContent: coreContent.map(c => c.name),
    toolsAndPlatforms: toolsAndPlatforms.map(t => t.name),
    functionalities: functionalities.map(f => f.name),
    tags: tags.map(t => t.name),
  };

  const details = {
    ...data.details,  
    coverImg: reduceAssets ? coverImg!.id : coverImg,
    promotionalVideo: reduceAssets ? data.details.promotionalVideo!.id : data.details.promotionalVideo
  };

  const promotion = data.promotion ? {
    ...data.promotion.product,
    percentage: data.promotion.percentage / 100
  } : null;

  const formattedData = {
    ...general,
    ...details,
    modules: reduceAssets ? modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => ({
        ...l, 
        video: l.video!.id,
        // documents: l.documents.map(d => d.id)
        documents: l.documents
      })) 
    })) : modules,
    promotion
  };

  return formattedData
};

export const groupCourse = (data: CourseWithFullAssets) => {
  const course = {
    general: {
      title: data.title,
      freeCourse: data.freeCourse,
      language: { name: data.language, label: data.language },
      shortDescription: data.shortDescription,
      contentType: data.contentType,
      courseDifficulty: data.courseDifficulty,
      platform: data.platform as Platform,
      sector: data.sector.map(s => ({ name: s, label: s })),
      coreContent: data.coreContent.map(c => ({ name: c, label: c })),
      toolsAndPlatforms: data.toolsAndPlatforms.map(t => ({ name: t, label: t })),
      functionalities: data.functionalities.map(f => ({ name: f, label: f })),
      tags: data.tags.map(t => ({ name: t, label: t })),
      price: data.price,
      targetAudience: data.targetAudience
    },
    details: {
      learningSubjects: data.learningSubjects,
      prevRequirements: data.prevRequirements,
      fullDescription: data.fullDescription,
      courseIncludes: data.courseIncludes,
      coverImg: data.coverImg,
      promotionalVideo: data.promotionalVideo,
      price: data.price
    },
    modules: data.modules,
    promotion: data.promotion ? {
      id: data.promotion.id,
      product: {
        id: data.promotion.id!,
        type: data.promotion.product.type
      },
      percentage: data.promotion.percentage
    } : null
  };   

  return course
};
