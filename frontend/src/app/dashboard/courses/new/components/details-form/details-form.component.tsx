"use client"

import { useEffect } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { CourseDetails } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import RouteBtn from "../../../../../../components/route-btn/route-btn.component";
import { setDetailsData } from "../../context/course-form.actions";
import useCourseContext from "../../hooks/use-course-context.hook";
import formMock from "./course-detail-form.mock.json"

const DetailsForm = () => {
  const { state, dispatch } = useCourseContext();

  const {
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<CourseDetails>(COURSE_DETAILS_INITIAL_STATE, state.details);

  useEffect(() => {
    console.log("inserting mocked data...");

    dispatch(setDetailsData(formMock))
  }, [dispatch])

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
          name="fullDescription" type="textarea" 
          label="Hacé una descripción detallada del contenido y de los beneficios que ofrece." { ...controlledCommonProps } 
          placeholder="Hacé una descripción detallada del contenido y de los beneficios que ofrece."
        />
        <Input 
          name="coverImg" type="upload"
          filetypes={{ "image/*": [".png", ".jpg"] }}
          dropzoneLabel="Sube una imagen para promocionar tu curso o lección" { ...controlledCommonProps }
        />
      </form>
      <div className="
        absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5
      ">
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) ) }
          route="general"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Retroceder
        </RouteBtn>
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) )}
          route="modules"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default DetailsForm
