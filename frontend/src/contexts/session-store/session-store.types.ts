import { ProjectFormData } from "@/types/project.types"
import { CourseFormData } from "@/types/courses.types"
import { ApplicationFormData } from "@/types/application.types"

export type SessionStore = {
  projectForm?: ProjectFormData
  courseForm?: CourseFormData
  applicationForm?: ApplicationFormData
}
