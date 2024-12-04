import { TCourseDetail } from "@/app/courses/components/detail/detail.types";
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

export const prepareCoursePreview = (data: CourseFormData): TCourseDetail => {
  if (!data.details.coverImg) throw new Error("coverImg cannot be null");

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
    } : null,
    additionalDetails: [
        { title: "¿Por que estudiar con Sebastian?", content: "Sebastián Ríos es un apasionado del desarrollo no-code, con más de 5 años de experiencia en AppSheet y un enfoque práctico y accesible para la enseñanza. Ha ayudado a cientos de profesionales y emprendedores a transformar sus ideas en aplicaciones exitosas, simplificando procesos y mejorando la productividad. Su metodología se centra en ejemplos reales y soluciones prácticas, lo que te permitirá aplicar lo aprendido de inmediato en tus propios proyectos. Aprender con Sebastián significa adquirir habilidades valiosas de la mano de un experto comprometido con tu éxito." },
        { title: "¿Para quién es este curso?", content: data.general.targetAudience },
    ],
  };

  return formattedData
};
