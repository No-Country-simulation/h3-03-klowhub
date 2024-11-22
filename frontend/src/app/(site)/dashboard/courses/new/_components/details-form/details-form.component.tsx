"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { CourseDetails } from "@/types/courses.types";
import Input from "@/components/input/input.component";

const onSubmit = (data: CourseDetails) => {
  console.log('data: ', data);
};

const GeneralForm = () => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
  } = useGenerateForm<CourseDetails>(COURSE_DETAILS_INITIAL_STATE, COURSE_DETAILS_INITIAL_STATE);

  return (
    <>
      <form onSubmit={ handleSubmit(data => onSubmit(data)) } className="flex flex-col gap-10">
        <Input 
          name="learningSubjects" type="richtext" 
          label="Decinos qué van a aprender tus estudiantes al finalizar el curso." { ...controlledCommonProps } 
          placeholder="Escribí una descripción básica del proyecto"
        />
        <Input 
          name="prevRequirements" type="richtext" 
          label="Requisitos previos" { ...controlledCommonProps } 
          placeholder="¿Qué necesitan saber o tener tus estudiantes antes de empezar?"
        />
        <Input 
          name="courseContent" type="richtext" 
          label="Hacé una descripción detallada del contenido y de los beneficios que ofrece." { ...controlledCommonProps } 
          placeholder="¿Qué necesitan saber o tener tus estudiantes antes de empezar?"
        />
        {/* <input type="submit" value="SUBMIT" /> */}
      </form>
    </>
  )
};

export default GeneralForm
