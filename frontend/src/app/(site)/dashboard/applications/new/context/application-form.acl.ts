import { Application, ApplicationFormData } from "@/types/application.types";

export const breakApplication = (data: ApplicationFormData): Application => {
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
    coverImg: data.media.coverImg?.id,
    assets: data.media.assets.map(ast => ast.id)
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
