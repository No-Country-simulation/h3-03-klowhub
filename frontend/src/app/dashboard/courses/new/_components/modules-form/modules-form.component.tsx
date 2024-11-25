"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { MODULE_INITIAL_STATE } from "./modules-form.consts";
import { useState, useEffect } from "react";
import { Module } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import LessonForm from "../lesson-form/lesson-form.component";
import { Lesson } from "@/types/courses.types";
import CourseModule from "../course-module/course-module.component";
import CourseLesson from "../course-lesson/course-lesson.component";

const onSubmit = (data: Module) => {
  console.log('data: ', data);
};

const ModulesForm = () => {
  const [ showLesson, setShowLesson ] = useState(false);
  const [ lessons, setLessons ] = useState<Lesson[]>([]);

  useEffect(() => {
    console.log('lessons: ', lessons);
  }, [lessons])

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
  } = useGenerateForm<Module>(MODULE_INITIAL_STATE, MODULE_INITIAL_STATE);

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
            Agregar Módulo
          </Button>
          <Button 
            variant="outline" className="px-14 self-end"
            onClick={() => setShowLesson(true)}
          >
            Agregar Lección
          </Button>
        </div>
      </form>
    </>
  )
};

export default ModulesForm
