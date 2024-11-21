import { UseFormRegister, FieldErrors, Control, FieldValues } from "react-hook-form";
import { CourseInfo, CourseDetails } from "@/types/courses.types";
import { OneOf } from "@/types/utils.types";
import { OptionsOrGroups, GroupBase } from "react-select";
import { Expand } from "@/types/utils.types";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "date" | "time" | "password";
type FieldName = Expand<keyof (CourseInfo & CourseDetails)> // this type is not strict but to make it strict we will need refactor too much things and rn it doesn't make sense to do that

// IMPORTANT: every new form should be added in these types
type FormErrors = OneOf<[ FieldErrors<CourseInfo>, FieldErrors<CourseDetails> ]>
type FormFields = OneOf<[ UseFormRegister<CourseInfo>, UseFormRegister<CourseDetails> ]>
type ControlledFields = OneOf<[ Control<CourseInfo>, Control<CourseDetails> ]>

type CommonProps = {
  name: FieldName
  label: string
  register: FormFields
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
  control: ControlledFields
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
  options?: OptionsOrGroups<SelectOption, GroupBase<SelectOption>> | undefined
  isMulti?: boolean
} & ControlledInput

export type InputProps = CommonInput | RadioInput | SelectInput | RichTextInput 
