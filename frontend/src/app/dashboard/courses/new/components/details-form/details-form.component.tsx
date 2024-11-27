"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { CourseDetails } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
import RouteBtn from "../route-btn/route-btn.component";
import { setDetailsData } from "../../context/course-form.actions";

const GeneralForm = () => {
  const courseCtx = useContext(CourseCtx);

  if (!courseCtx) throw new Error("no context found");

  const { state, dispatch } = courseCtx

  const {
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<CourseDetails>(COURSE_DETAILS_INITIAL_STATE, state.details);

  return (
    <>
      <form className="flex flex-col gap-10">
        <Input 
          name="learningSubjects" type="multitext" 
          label="Decinos qué van a aprender tus estudiantes al finalizar el curso." { ...controlledCommonProps } 
          addButtonLabel="Añadir materia"
          placeholder="Qué aprenderán tus estudiantes?"
        />
        <Input 
          name="prevRequirements" type="multitext" 
          label="Requisitos previos: ¿Qué necesitan saber o tener tus estudiantes antes de empezar?" { ...controlledCommonProps } 
          addButtonLabel="Añadir requisito"
          placeholder="¿Qué necesitan saber?"
        />
        <Input 
          name="courseContent" type="textarea" 
          label="Hacé una descripción detallada del contenido y de los beneficios que ofrece." { ...controlledCommonProps } 
          placeholder="Hacé una descripción detallada del contenido y de los beneficios que ofrece."
        />
        <Input 
          name="coverImg" type="upload"
          filetypes={{ "image/*": [".png", ".jpg"] }}
          label="Sube una imagen para promocionar tu curso o lección" { ...controlledCommonProps }
          limit={1}
        />
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5">
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) ) }
          route="general"
        >
          Retroceder
        </RouteBtn>
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) )}
          route="modules"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default GeneralForm
