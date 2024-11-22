import { UseFormRegister, FieldErrors, Control, FieldValues, Path } from "react-hook-form";
import { OptionsOrGroups, GroupBase } from "react-select";
import { Lesson, Link } from "@/types/courses.types";

type FieldType = "text" | "link" | "textarea" | "number" | "checkbox" | "date" | "time" | "password";

type CommonProps<T extends FieldValues> = {
  name: Path<T>
  label: string
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  placeholder?: string
  className?: string
}

type CommonInput<T extends FieldValues> = {
  type: FieldType
} & CommonProps<T>

type RadioInput<T extends FieldValues> = {
  type: "radio-group"
  options: [ string, string ] 
} & Omit<CommonProps<T>, "placeholder">

type ControlledInput<T extends FieldValues> = {
  control: Control<T>
} & CommonProps<T>

type RichTextInput<T extends FieldValues> = {
  type: "richtext"
} & ControlledInput<T>

type UploadInput<T extends FieldValues> = {
  type: "upload"
  isMulti?: boolean
  limit?: number
} & ControlledInput<T>

// type LinkInput<T extends FieldValues> = {
//   type: "link"
//   isMulti?: boolean
//
// } & ControlledInput<T>
//

export type SelectOption = {
  name: string
  label: string
}

type SelectInput<T extends FieldValues> = {
  type: "select"
  options?: OptionsOrGroups<SelectOption, GroupBase<SelectOption>> | undefined
  isMulti?: boolean
} & ControlledInput<T>

export type InputProps<T extends FieldValues> = CommonInput<T> | RadioInput<T> | SelectInput<T> | RichTextInput<T> | UploadInput<T>


export const LESSON_INITIAL_STATE: Lesson = {
  title: "",
  description: "",
  videos: [],
  resources: [],
  link: ""
};
