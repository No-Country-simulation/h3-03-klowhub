import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CourseInfo } from "@/types/courses.types";
import { OneOf } from "@/types/utils.types";

type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "date" | "time" | "password";
type FieldName = keyof (CourseInfo) // this type is not strict but to make it strict we will need refactor too much things and rn it doesn't make sense to do that
type FormErrors = OneOf<[ FieldErrors<CourseInfo> ]>

export type Props = {
  name: FieldName
  type: FieldType
  register: UseFormRegister<OneOf<[ CourseInfo ]>>
  errors: FormErrors
}
