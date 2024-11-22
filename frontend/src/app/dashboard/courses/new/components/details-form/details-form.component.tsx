"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { CourseDetails } from "@/types/courses.types";
import { Button } from "@/components/ui/button";
import Input from "@/components/input/input.component";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
import RouteBtn from "../route-btn/route-btn.component";

const GeneralForm = () => {
  const {
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<CourseDetails>(COURSE_DETAILS_INITIAL_STATE, COURSE_DETAILS_INITIAL_STATE);
  const { courseData, setCourseData, routeChanger } = useContext(CourseCtx);
  const deps = { handleSubmit, setCourseData, routeChanger, isDirty };

  return (
    <>
      <form className="flex flex-col gap-10">
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
        <Input 
          name="courseImg" type="upload"
          label="Sube una foto clara de la parte delantera de tu documento." { ...controlledCommonProps }
          limit={5}
        />
      </form>
      <div className="absolute w-full mt-6 -ml-6 flex justify-between pt-5">
        <RouteBtn direction="prev" keyToUpdate="details" { ...deps } />
        <RouteBtn direction="next" keyToUpdate="details" { ...deps } />
      </div>
    </>
  )
};

export default GeneralForm
