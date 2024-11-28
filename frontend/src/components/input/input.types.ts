import { UseFormRegister, FieldErrors, Control, FieldValues, Path } from "react-hook-form";
import { OptionsOrGroups, GroupBase } from "react-select";
import { ReactNode } from "react";
import { FileType } from "@/types/global.types";

type FieldType = "text" | "link" | "textarea" | "number" | "checkbox" | "date" | "time" | "password" | "textarea";

type RadioOption = {
  value: string,
  label: string,
}

type CommonProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
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
  options: [ RadioOption, RadioOption ] 
} & Omit<CommonProps<T>, "placeholder">

type ControlledInput<T extends FieldValues> = {
  control: Control<T>
} & CommonProps<T>

type ProductSelector<T extends FieldValues> = {
  type: "product-selector"
  children: ReactNode
  productId: number
  productType: "application" | "course"
} & ControlledInput<T>

type RichTextInput<T extends FieldValues> = {
  type: "richtext"
} & ControlledInput<T>

type MultitextInput<T extends FieldValues> = {
  type: "multitext"
  addButtonLabel: string
} & ControlledInput<T>

type UploadInput<T extends FieldValues> = {
  type: "upload"
  isMulti?: boolean
  limit?: number
  filetypes: FileType
  dropzoneLabel?: string
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

export type InputProps<T extends FieldValues> = CommonInput<T> | RadioInput<T> | SelectInput<T> | RichTextInput<T> | UploadInput<T> | ProductSelector<T> | MultitextInput<T>
