import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { CourseInfo } from "@/types/courses.types";
import { OneOf } from "@/types/utils.types";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "time" | "password";
type FieldName = keyof (CourseInfo) // this type is not strict but to make it strict we will need refactor too much things and rn it doesn't make sense to do that
type FormErrors = OneOf<[ FieldErrors<CourseInfo> ]>

type CommonProps = {
  name: FieldName
  label: string
  register: UseFormRegister<OneOf<[ CourseInfo ]>>
  errors: FormErrors
}

type CommonInput = {
  type: FieldType
} & CommonProps

type RadioInput = {
  type: "radio-group"
  options: [ string, string ] 
} & CommonProps

type ControlledInput = {
  name: FieldName
  type: "richtext"
  control: Control<CourseInfo>
} & Omit<CommonProps, "name">

export type InputProps = CommonInput | RadioInput | ControlledInput