import { Application, ApplicationFormData } from "@/types/application.types";

export const breakApplication = (data: ApplicationFormData, breakImgs?: boolean): Application => {
  const { general: { tags, sector, toolsAndPlatforms, functionalities, language } } = data;

  const general = {
    ...data.general,
    sector: sector.map(s => s.name),
    functionalities: functionalities.map(f => f.name),
    toolsAndPlatforms: toolsAndPlatforms.map(t => t.name),
    tags: tags.map(t => t.name),
    language: language.name
  };

  const media = {
    ...data.media,
    coverImg: breakImgs ? data.media.coverImg?.id : data.media.coverImg,
    assets: breakImgs ? data.media.assets.map(ast => ast.id) : data.media.assets
  };

  const promotion = data.promotion ? {
    ...data.promotion.product,
    percentage: data.promotion.percentage / 100
  } : null;

  // @ts-ignore: Unreachable code error
  return {
    ...general,
    ...data.details,
    ...media,
    promotion 
  }
};

export const groupApplication = (data: Application): ApplicationFormData => {
  const application = {
    general: {
      title: data.title,
      shortDescription: data.shortDescription,
      platform: data.platform,
      language: { name: data.language, label: data.language },
      sector: data.sector.map(s => ({ name: s, label: s })),
      functionalities: data.functionalities.map(f => ({ name: f, label: f })),
      toolsAndPlatforms: data.toolsAndPlatforms.map(t => ({ name: t, label: t })),
      tags: data.tags.map(t => ({ name: t, label: t }))
    },
    details: {
      features: data.features,
      targetAudience: data.targetAudience,
      fullDescription: data.fullDescription,
      views: data.views,
      appIncludes: data.appIncludes,
      price: data.price,
    },
    media: {
      coverImg: data.coverImg,
      desktopLink: data.desktopLink,
      mobileLink: data.mobileLink,
      assets: data.assets
    },
    promotion: data.promotion ? {
      product: {
        id: data.promotion.id,
        type: data.promotion.type
      },
      percentage: data.promotion.percentage
    } : null
  };   

  return application
};
