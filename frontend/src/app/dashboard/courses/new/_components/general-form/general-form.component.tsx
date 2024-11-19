"use client"

import { useForm } from "react-hook-form";
import { initialState } from "./general-form.consts";
import { CourseInfo } from "@/types/courses.types";

const GeneralForm = () => {
  const { register } = useForm<CourseInfo>({ defaultValues: initialState });
  return (
    <>
      <form >
        <div className="flex flex-col">
          <label htmlFor="title">Título del curso / lección</label>
          <input type="text" { ...register("title") }/>
        </div>
      </form>
    </>
  )
};

export default GeneralForm
