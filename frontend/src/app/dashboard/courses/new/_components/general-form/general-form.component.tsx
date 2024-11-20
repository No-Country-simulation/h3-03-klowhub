"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_INFO_INITIAL_STATE } from "./general-form.consts";
import { CourseInfo } from "@/types/courses.types";
import Input from "@/components/input/input.component";

const onSubmit = (data: CourseInfo) => {
  console.log('data: ', data);
};

const GeneralForm = () => {
  const { commonProps, handleSubmit } = useGenerateForm<CourseInfo>(COURSE_INFO_INITIAL_STATE, COURSE_INFO_INITIAL_STATE);
  return (
    <>
      <form onSubmit={ handleSubmit(data => onSubmit(data)) }>
        <Input name="title" type="text" label="Título del curso / lección" { ...commonProps } />
        <div className="flex gap-5">
          <Input name="freeCourse" options={[ "Gratuito", "Pago" ]} type="radio" label="¿Qué tipo de contenido estás buscando: gratuito o premium?" { ...commonProps } />
          <Input name="contentType" options={[ "Curso", "Lección" ]} type="radio" label="Seleccioná si vas a crear un curso  o una lección." { ...commonProps } />
        </div>
        <button></button>
      </form>
    </>
  )
};

export default GeneralForm
