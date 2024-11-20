"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_INFO_INITIAL_STATE } from "./general-form.consts";
import { CourseInfo } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { language, coreContent, functionalities, sector, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";

const onSubmit = (data: CourseInfo) => {
  console.log('data: ', data);
};

const GeneralForm = () => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit 
  } = useGenerateForm<CourseInfo>(COURSE_INFO_INITIAL_STATE, COURSE_INFO_INITIAL_STATE);

  return (
    <>
      <form onSubmit={ handleSubmit(data => onSubmit(data)) } className="grid grid-cols-2 gap-y-10 gap-x-28 grid-rows-auto items-start">
        <Input 
          name="title" type="text"
          label="Título del curso / lección" { ...commonProps } 
          className="col-span-2"
        />
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
          />
          <Input 
            name="coreContent" type="select" options={coreContent.items} 
            label="Define el contenido de tu curso" { ...controlledCommonProps } 
          />
          <Input 
            name="functionalities" type="select" options={functionalities.items} 
            label="Funcionalidades" { ...controlledCommonProps } 
            isMulti
          />
          <Input 
            name="sector" type="select" options={sector.items} 
            label="Elige el sector al que deseas dirigir tu curso" { ...controlledCommonProps } 
          />
          <Input 
            name="tools" type="select" options={toolsAndPlatforms.items} 
            label="Herramientas y plataformas" { ...controlledCommonProps } 
          />
          <Input 
            name="tags" type="select" options={functionalities.items} 
            label="Funcionalidades" { ...controlledCommonProps } 
            isMulti
          />
        </IsClientProvider>
        <input type="submit" value="SUBMIT" />
      </form>
    </>
  )
};

export default GeneralForm
