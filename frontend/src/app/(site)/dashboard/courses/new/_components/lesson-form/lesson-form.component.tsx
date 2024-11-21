"use client"

import { FormEvent } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { LESSON_INITIAL_STATE } from "./lesson-form.consts";
import { Lesson } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setLessons: Dispatch<SetStateAction<Lesson[]>>
}

const onSubmit = (data: Lesson, setter: Dispatch<SetStateAction<Lesson[]>>) => {
  console.log('data: ', data);
  setter(prev => [ ...prev, data ])
};
// const onSubmit = (e:FormEvent<HTMLFormElement>) => {
//   console.log('e: ', e);
//   e.preventDefault()
//   // console.log('data: ', data);
//   // setter(prev => [ ...prev, data ])
// };

const LessonForm = ({ setLessons }: Props) => {
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
  } = useGenerateForm<Lesson>(LESSON_INITIAL_STATE, LESSON_INITIAL_STATE);

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
        <Button 
          type="button"
          variant="outline"
          className="border-primary-200 text-primary-200 px-14 self-end"
          onClick={handleSubmit(data => onSubmit(data, setLessons))}
        >
        Guardar
        </Button>
      </div>
    </>
  )
};

export default LessonForm
