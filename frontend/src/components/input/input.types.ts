import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { CourseInfo } from "@/types/courses.types";
import { OneOf } from "@/types/utils.types";
import { OptionsOrGroups, GroupBase } from "react-select";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "date" | "time" | "password";
type FieldName = keyof (CourseInfo) // this type is not strict but to make it strict we will need refactor too much things and rn it doesn't make sense to do that
type FormErrors = OneOf<[ FieldErrors<CourseInfo> ]>

type CommonProps = {
  name: FieldName
  label: string
  register: UseFormRegister<OneOf<[ CourseInfo ]>>
  errors: FormErrors
  placeholder?: string
  className?: string
}

type CommonInput = {
  type: FieldType
} & CommonProps

type RadioInput = {
  type: "radio-group"
  options: [ string, string ] 
} & Omit<CommonProps, "placeholder">

type ControlledInput = {
  control: Control<CourseInfo>
} & CommonProps

type RichTextInput = {
  type: "richtext"
} & ControlledInput

export type SelectOption = {
  name: string
  label: string
}

type SelectInput = {
  type: "select"
  // options: SelectOption[]
  options?: OptionsOrGroups<SelectOption, GroupBase<SelectOption>> | undefined
  isMulti?: boolean
} & ControlledInput

export type InputProps = CommonInput | RadioInput | SelectInput | RichTextInput 
