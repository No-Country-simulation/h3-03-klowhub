"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_INFO_INITIAL_STATE } from "./general-info-form.consts";
import { CourseInfo } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { language, coreContent, functionalities, sector, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import { CircleAlert } from "lucide-react";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
import RouteBtn from "../route-btn/route-btn.component";

const GeneralForm = () => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<CourseInfo>(COURSE_INFO_INITIAL_STATE, COURSE_INFO_INITIAL_STATE);
  const { courseData, setCourseData, routeChanger } = useContext(CourseCtx);
  const deps = { handleSubmit, setCourseData, routeChanger, isDirty };

  return (
    <>
      <form className="grid grid-cols-2 gap-y-10 gap-x-48 grid-rows-auto items-start">
        <Input 
          name="title" type="text"
          label="Título del curso / lección" { ...commonProps } 
          placeholder="Nombrá tu curso o lección"
          className="col-span-2"
        />
        <div className="text-sm font-bold flex gap-5 col-span-2 bg-gray-100 rounded-2xl px-5 py-3 w-[650px]">
          <div><CircleAlert /></div>
          <span>El contenido gratuito ofrece acceso limitado a [características breves del contenido gratuito]. El contenido premium desbloquea [principales beneficios del contenido de pago]. Más información en nuestra <span className="text-secondary-400">[documentación]</span>.</span>
        </div>
        <Input
          name="freeCourse" options={[ "Gratuito", "Pago" ]} type="radio-group"
          label="¿Qué tipo de contenido estás buscando: gratuito o premium?" { ...commonProps }
        />
        <Input 
          name="contentType" options={[ "Curso", "Lección" ]} type="radio-group" 
          label="Seleccioná si vas a crear un curso  o una lección." { ...commonProps } 
        />
        <Input 
          name="about" type="richtext" 
          label="Contá de qué trata, en no más de 3 líneas." { ...controlledCommonProps } 
          placeholder="Escribí una descripción básica del proyecto"
          className="col-span-2"
        />
        <Input
          name="level" options={[ "Básico", "Intermedio" ]} type="radio-group"
          label="Nivel de competencia" { ...commonProps }
        />
        <Input 
          name="platform" options={[ "AppSheet", "PowerApps" ]} type="radio-group" 
          label="Plataforma" { ...commonProps } 
        />
        <IsClientProvider>
          <Input 
            name="language" type="select" options={language.items} 
            label="Elige el idioma del curso" { ...controlledCommonProps } 
            placeholder="Seleccionar idioma"
          />
          <Input 
            name="coreContent" type="select" options={coreContent.items} 
            label="Define el contenido de tu curso" { ...controlledCommonProps } 
            placeholder="Pilar de contenido"
          />
          <Input 
            name="functionalities" type="select" options={functionalities.items} 
            label="Funcionalidades" { ...controlledCommonProps } 
            isMulti
            placeholder="Funcionalidades"
          />
          <Input 
            name="sector" type="select" options={sector.items} 
            label="Elige el sector al que deseas dirigir tu curso" { ...controlledCommonProps } 
            placeholder="Seleccionar sector"
          />
          <Input 
            name="tools" type="select" options={toolsAndPlatforms.items} 
            label="Herramientas y plataformas" { ...controlledCommonProps } 
            placeholder="Herramientas y plataformas"
          />
          <Input 
            name="tags" type="select" options={functionalities.items} 
            label="Funcionalidades" { ...controlledCommonProps } 
            isMulti
            placeholder="Selecciona las etiquetas"
          />
        </IsClientProvider>
      </form>
      <div className="absolute w-full mt-6 -ml-6 flex justify-end pt-5">
        <RouteBtn direction="next" keyToUpdate="generalInfo" { ...deps } />
      </div>
    </>
  )
};

export default GeneralForm
