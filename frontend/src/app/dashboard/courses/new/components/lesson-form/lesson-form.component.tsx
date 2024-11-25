"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { LESSON_INITIAL_STATE } from "./lesson-form.consts";
import { Lesson } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
import { setModulesData } from "../../context/course-form.actions";
import { FieldValues, Path, UseFormGetValues, UseFormSetValue } from "react-hook-form";

type Props<F extends FieldValues> = {
  lessonIdx: number
  setShowLessonForm: Dispatch<SetStateAction<boolean>>
  updateModule: UseFormSetValue<F>
  getValues: UseFormGetValues<F>
  setCurrentLesson: Dispatch<SetStateAction<number>>
}

const LessonForm = <F extends FieldValues>({ lessonIdx, setShowLessonForm, updateModule, getValues, setCurrentLesson }: Props<F>) => {
  const {
    controlledCommonProps, 
    handleSubmit,
    reset,
  } = useGenerateForm<Lesson>(LESSON_INITIAL_STATE, getValues("lessons")[lessonIdx] || LESSON_INITIAL_STATE);
  console.log('lessonIdx: ', lessonIdx);

  return (
    <>
      <div 
        className="flex flex-col gap-10 p-5 rounded-2xl bg-gray-100"
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
        <div className="flex justify-end gap-5">
          <Button 
            variant="outline" className="px-14 self-end border-red-500 text-red-500 hover:bg-red-500"
            onClick={() => { 
              setCurrentLesson(NaN)
              setShowLessonForm(false) 
              reset()
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="button"
            className="px-14 self-end" 
            onClick={handleSubmit(data => {
              if (isNaN(lessonIdx)) {
                const currentLessons = getValues("lessons");
                updateModule("lessons", [ ...currentLessons, data ])
              } else {
                const updatedLessons = (getValues("lessons").map((l, idx) => {
                  if (idx !== lessonIdx) return l;
                  return data
                }));
                updateModule("lessons", updatedLessons)
              };
              reset()
              setCurrentLesson(NaN)
              setShowLessonForm(false)
            })}
          >
            Guardar Lección
          </Button>
        </div>
      </div>
    </>
  )
};

export default LessonForm
