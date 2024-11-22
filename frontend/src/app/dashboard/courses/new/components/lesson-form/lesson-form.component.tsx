"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { LESSON_INITIAL_STATE } from "./lesson-form.consts";
import { Lesson } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";

type Props = {
  setLessons: Dispatch<SetStateAction<Lesson[]>>
}

const LessonForm = ({ setLessons }: Props) => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
  } = useGenerateForm<Lesson>(LESSON_INITIAL_STATE, LESSON_INITIAL_STATE);
  const { courseData, setCourseData, routeChanger } = useContext(CourseCtx);

  return (
    <>
      <div 
        className="flex flex-col gap-10 p-5 rounded-2xl bg-gray-200"
      >
        <Input 
          name="title" type="text" 
          label="Título de la lección" { ...controlledCommonProps } 
          placeholder="Nombrá tu curso o lección"
        />
        <Input 
          name="description" type="richtext" 
          label="Descripción" { ...controlledCommonProps } 
          placeholder="Escribe una descripción básica del proyecto"
        />
        <Input 
          name="link" type="link" 
          label="Enlace" { ...controlledCommonProps } 
        />
        <Input 
          name="videos" type="upload"
          label="Sube una foto clara de la parte delantera de tu documento." { ...controlledCommonProps }
          isMulti
          limit={4}
        />
        {/* <div className="absolute w-full mt-6 -ml-6 flex justify-end pt-5"> */}
        {/*   <Button  */}
        {/*     type="button" */}
        {/*     className="right-0 px-14 self-end"  */}
        {/*     onClick={setCourseData ? handleSubmit(data => { */}
        {/*       setCourseData(prev => ({ ...prev, generalInfo: data })) */}
        {/*       if (routeChanger) { routeChanger("next") } */}
        {/*     }) : undefined} */}
        {/*   > */}
        {/*     Continuar */}
        {/*   </Button> */}
        {/* </div> */}
      </div>
    </>
  )
};

export default LessonForm
