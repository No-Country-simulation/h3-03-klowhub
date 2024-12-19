import { ApplicationWithFullImgs, ApplicationWithReducedImgs, ApplicationFormData, ValidatedApplicationForm } from "@/types/application.types";
import { RecursiveNonNullable } from "@/types/utils.types";
import { Platform, Promotion } from "@/types/global.types";

// @ts-ignore: Unreachable code error
export function breakApplication (data: ApplicationFormData, reduceImgs: true): ApplicationWithReducedImgs
export function breakApplication (data: ApplicationFormData, reduceImgs: false): ApplicationWithFullImgs
export function breakApplication (data: ValidatedApplicationForm, reduceImgs = false) {
  const { general: { tags, sector, toolsAndPlatforms, functionalities, language }, media: { coverImg, assets } } = data;

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
    coverImg: reduceImgs ? coverImg!.id : coverImg,
    assets: reduceImgs ? assets.map(ast => ast.id) : assets
  };

  const promotion = data.promotion ? {
    ...data.promotion.product,
    percentage: data.promotion.percentage / 100
  } : null;

  return {
    ...general,
    ...data.details,
    ...media,
    promotion 
  }
};

export const groupApplication = (data: ApplicationWithFullImgs) => {
  const application = {
    general: {
      title: data.title,
      shortDescription: data.shortDescription,
      platform: data.platform as Platform,
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
