import { Course, CourseFormData } from "@/types/courses.types";

export const breakCourse = (data: CourseFormData, reduceImgs?: boolean): Course => {
  const { general: { tags, sector, coreContent, toolsAndPlatforms, functionalities, language } } = data;

  const general = {
    ...data.general,
    language: language.name,
    sector: sector.map(s => s.name),
    coreContent: coreContent.map(c => c.name),
    // WARNING: it should be toolsAndPlatforms with an 's', this is temporary until api returns the righr prop
    toolsAndPlatform: toolsAndPlatforms.map(t => t.name),
    functionalities: functionalities.map(f => f.name),
    tags: tags.map(t => t.name),
  };

  const details = {
    ...data.details,
    // WARNING: this is temporary until api includes this column
    courseIncludes: [],
    coverImg: reduceImgs ? data.details.coverImg?.id : data.details.coverImg
  };

  const promotion = data.promotion ? {
    ...data.promotion.product,
    percentage: data.promotion.percentage / 100
  } : null;

  const formattedData = {
    ...general,
    ...details,
    modules: data.modules,
    promotion
  };

  console.log('formattedData: ', formattedData);

  // @ts-ignore: Unreachable code error
  return formattedData
};

export const groupCourse = (data: Course): CourseFormData => {
  console.log('data: ', data);
  const course = {
    general: {
      title: data.title,
      freeCourse: data.freeCourse,
      language: data.language,
      shortDescription: data.shortDescription,
      contentType: data.contentType,
      courseDifficulty: data.courseDifficulty,
      platform: data.platform,
      sector: data.sector.map(s => ({ name: s, label: s })),
      coreContent: data.coreContent.map(c => ({ name: c, label: c })),
      // WARNING: it should be toolsAndPlatforms with an 's', this is temporary until api returns the righr prop
      toolsAndPlatforms: data.toolsAndPlatform.map(t => ({ name: t, label: t })),
      functionalities: data.functionalities.map(f => ({ name: f, label: f })),
      tags: data.tags.map(t => ({ name: t, label: t })),
      price: data.price,
      targetAudience: data.targetAudience
    },
    details: {
      learningSubjects: data.learningSubjects,
      prevRequirements: data.prevRequirements,
      fullDescription: data.fullDescription,
      // WARNING: it should be toolsAndPlatforms with an 's', this is temporary until api returns the righr prop
      courseIncludes: [],
      coverImg: data.coverImg,
      promotionalVideo: data.promotionalVideo
    },
    modules: data.modules,
    promotion: data.promotion ? {
      product: {
        id: data.promotion.id,
        type: data.promotion.type
      },
      percentage: data.promotion.percentage
    } : null
  };   

  // @ts-ignore: Unreachable code error
  return course
};
