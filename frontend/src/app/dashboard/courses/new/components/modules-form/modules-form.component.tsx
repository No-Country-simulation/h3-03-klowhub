"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { MODULE_INITIAL_STATE } from "./modules-form.consts";
import { useState, useEffect } from "react";
import { Module } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import LessonForm from "../lesson-form/lesson-form.component";
import { Lesson } from "@/types/courses.types";
import { useContext } from "react";
import CourseModule from "../course-module/course-module.component";
import CourseLesson from "../course-lesson/course-lesson.component";
import RouteBtn from "../route-btn/route-btn.component";
import CourseCtxProvider from "../../context/course-form.context";
import { CourseCtx } from "../../context/course-form.context";

const onSubmit = (data: Module) => {
  console.log('data: ', data);
};

const ModulesForm = () => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<Module>(MODULE_INITIAL_STATE, MODULE_INITIAL_STATE);

  const [ showLesson, setShowLesson ] = useState(false);
  const [ lessons, setLessons ] = useState<Lesson[]>([]);
  const { courseData, setCourseData, routeChanger } = useContext(CourseCtx);
  const deps = { handleSubmit, setCourseData, routeChanger, isDirty };

  useEffect(() => {
    console.log('lessons: ', lessons);
  }, [lessons])

  return (
    <>
      <form onSubmit={ handleSubmit(data => onSubmit(data)) } className="flex flex-col gap-10">
        <Input 
          name="title" type="text" 
          label="Título del módulo" { ...controlledCommonProps } 
          placeholder="Nombrá tu curso o lección"
        />
        <Input 
          name="description" type="richtext" 
          label="Descripción" { ...controlledCommonProps } 
          placeholder="Escribe una descripción básica del proyecto"
        />
        <div className="flex flex-col gap-1">
          { lessons.map((l, idx) => (
              <CourseLesson key={`lesson-${idx}`} data={l} />
          )) }
        </div>
        { showLesson && <LessonForm setLessons={setLessons} /> }
        <div className="flex gap-5 justify-end">
          <Button 
            variant="outline" className="px-14 self-end"
          >
            Guardar Módulo
          </Button>
          {/* <Button  */}
          {/*   variant="outline" className="px-14 self-end" */}
          {/* > */}
          {/*   Agregar Módulo */}
          {/* </Button> */}
          <Button 
            variant="outline" className="px-14 self-end"
            onClick={() => setShowLesson(true)}
          >
            Agregar Lección
          </Button>
        </div>
      </form>
      <div className="absolute w-full mt-6 -ml-6 flex justify-between pt-5">
        <RouteBtn direction="prev" keyToUpdate="details" { ...deps } />
        <RouteBtn direction="next" keyToUpdate="details" { ...deps } />
      </div>
    </>
  )
};

export default ModulesForm
