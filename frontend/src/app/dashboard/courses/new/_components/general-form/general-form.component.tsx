"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_INFO_INITIAL_STATE } from "./general-form.consts";
import { CourseInfo } from "@/types/courses.types";
import Input from "@/components/input/input.component";

const GeneralForm = () => {
  const { commonProps } = useGenerateForm<CourseInfo>(COURSE_INFO_INITIAL_STATE, COURSE_INFO_INITIAL_STATE);
  return (
    <>
      <form >
        <Input name="title" type="text" { ...commonProps } />
      </form>
    </>
  )
};

export default GeneralForm
