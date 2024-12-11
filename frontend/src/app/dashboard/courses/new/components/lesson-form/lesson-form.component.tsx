"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { LESSON_INITIAL_STATE } from "./lesson-form.consts";
import { Lesson } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { X } from "lucide-react";
import useCourseContext from "../../hooks/use-course-context.hook";
import { Module } from "@/types/courses.types";

type Props = {
  lessonIdx: number
  setShowLessonForm: Dispatch<SetStateAction<boolean>>
  updateModule: UseFormSetValue<Module>
  getValues: UseFormGetValues<Module>
  setCurrentLesson: Dispatch<SetStateAction<number>>
}

const LessonForm = ({ lessonIdx, setShowLessonForm, updateModule, getValues, setCurrentLesson }: Props) => {
  const { state } = useCourseContext();

  const {
    controlledCommonProps, 
    handleSubmit,
    watch,
    setValue
  } = useGenerateForm<Lesson>(LESSON_INITIAL_STATE, getValues("lessons")[lessonIdx] || LESSON_INITIAL_STATE);

  const freeLesson = watch("freeLesson");

  return (
    <>
      <div 
        className="flex flex-col gap-10 p-5 rounded-2xl bg-gray-100"
      >
        <div className="relative">
          <Input 
            name="title" type="text" 
            label="Título de la lección" { ...controlledCommonProps } 
            placeholder="Nombrá tu lección"
          />
          <X 
            className="absolute top-0 right-0 cursor-pointer text-primary-300"
            onClick={() => { 
              setCurrentLesson(NaN)
              setShowLessonForm(false) 
            }}
          />
        </div>
        <Input 
          name="description" type="textarea" 
          label="Descripción" { ...controlledCommonProps } 
          placeholder="Detallá el contenido de la lección"
        />
        <Input
          name="freeLesson" type="boolean"
          options={[ "Sí", "No" ]}
          label="¿Es una lección gratuita?" 
          reactFn={() => {
            setValue("video", null)
            setValue("link", null)
          }}
          { ...controlledCommonProps }
        />
        { freeLesson || state.general.freeCourse ?
          <Input 
            name="link" type="link" 
            label="Contenido de la lección" 
            className="w-full col-span-2"
            { ...controlledCommonProps } 
          /> : 
          <Input 
            name="video" type="upload"
            filetypes={{ "video/mp4": [".mp4"] }}
            label="Contenido de la lección" 
            dropzoneLabel="Sube el video de esta lección" { ...controlledCommonProps }
            className="w-full"
          />
        }
        <Input 
          filetypes={{ "application/pdf": [".pdf"] }}
          name="documents" type="upload"
          dropzoneLabel="Sube documentos extra como manuales o guías." { ...controlledCommonProps }
          isMulti
          className="w-full"
          limit={4}
          label="Material adicional"
        />
        <div className="flex justify-end gap-5">
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
