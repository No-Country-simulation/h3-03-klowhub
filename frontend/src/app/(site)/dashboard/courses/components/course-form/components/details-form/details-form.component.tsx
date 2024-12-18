"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { CourseDetails } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setDetailsData } from "../../context/course-form.actions";
import useCourseContext from "../../hooks/use-course-context.hook";

const DetailsForm = () => {
  const { state, dispatch } = useCourseContext();

  const {
    commonProps,
    controlledCommonProps,
    handleSubmit,
    formState: { isDirty },
  } = useGenerateForm<CourseDetails>(COURSE_DETAILS_INITIAL_STATE, state.details);

  const isFree = state.general.freeCourse;

  return (
    <>
      <form className="flex flex-col gap-10">
        <Input
          name="learningSubjects" type="multitext"
          label="Decinos qué van a aprender tus estudiantes al finalizar el curso." 
          addButtonLabel="Añadir materia"
          placeholder="Qué aprenderán tus estudiantes?"
          {...controlledCommonProps}
        />
        <Input
          name="prevRequirements" type="multitext"
          label="Requisitos previos: ¿Qué necesitan saber o tener tus estudiantes antes de empezar?" {...controlledCommonProps}
          addButtonLabel="Añadir requisito"
          placeholder="¿Qué necesitan saber?"
        />
        <Input
          name="courseIncludes" type="multitext"
          label="Detalla qué material extra incluyes con la compra de tu curso."
          addButtonLabel="Añadir item"
          placeholder="¿Qué obtendrán tus estudiantes al comprar el curso?"
          {...controlledCommonProps}
        />
        <Input
          name="fullDescription" type="textarea"
          label="Hacé una descripción detallada del contenido y de los beneficios que ofrece."
          placeholder="Hacé una descripción detallada del contenido y de los beneficios que ofrece."
          {...commonProps}
        />
        <Input
          entity="course"
          name="coverImg" type="upload"
          filetypes={{ "image/*": [".png", ".jpg"] }}
          label="Subí una imagen que represente tu curso de manera atractiva para utilizarla de portada"
          dropzoneLabel="Subí una imagen para promocionar tu curso o lección"
          {...controlledCommonProps}
        />
        <Input
          entity="course"
          name="promotionalVideo" type="upload"
          filetypes={{ "video/mp4": [".mp4"] }}
          label="Subí un video que sirva de introducción general a tu curso o lección"
          dropzoneLabel="Subí un video para introducir tu curso o lección"
          {...controlledCommonProps}
        />
        { !isFree &&
          <Input
            type="number"
            name="price"
            label="Indica el precio de tu aplicación en USD."
            {...commonProps}
          />
        }
      </form>
      <div className="
        absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5
      ">
        <RouteBtn
          setter={handleSubmit(data => dispatch(setDetailsData(data)))}
          route="general"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Retroceder
        </RouteBtn>
        <RouteBtn
          setter={handleSubmit(data => dispatch(setDetailsData(data)))}
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
