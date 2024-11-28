"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { LESSON_INITIAL_STATE } from "./lesson-form.consts";
import { Lesson } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { X } from "lucide-react";

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
              reset()
            }}
          />
        </div>
        <Input 
          name="description" type="textarea" 
          label="Descripción" { ...controlledCommonProps } 
          placeholder="Detallá el contenido de la lección"
        />
        <h3 className="col-span-2 font-bold">Contenido de la lección</h3>
        <Input 
          name="link" type="link" 
          label="Enlace" { ...controlledCommonProps } 
          className="w-full"
        />
        <Input 
          name="videos" type="upload"
          filetypes={{ "image/*": [".png", ".jpg"] }}
          dropzoneLabel="Sube los videos que deseas agregar a esta lección" { ...controlledCommonProps }
          isMulti
          className="w-full"
          limit={1}
        />
        <h3 className="col-span-2 font-bold">Material adicional</h3>
        <Input 
          filetypes={{ "application/pdf": [".pdf"] }}
          name="resources" type="upload"
          dropzoneLabel="Sube documentos extra como manuales o guías." { ...controlledCommonProps }
          isMulti
          className="w-full md:w-64"
          limit={4}
        />
        <div className="flex justify-end gap-5">
          {/* <Button  */}
          {/*   variant="outline" className="px-14 self-end border-red-500 text-red-500 hover:bg-red-500" */}
          {/*   onClick={() => {  */}
          {/*     setCurrentLesson(NaN) */}
          {/*     setShowLessonForm(false)  */}
          {/*     reset() */}
          {/*   }} */}
          {/* > */}
          {/*   Cancelar */}
          {/* </Button> */}
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
