import { Module } from "@/types/courses.types";

type Props = {
  data: Module
}

const CourseModule = ({ data }: Props) => {
  return (
    <>
      <div>
        <h3>Título de la lección</h3>
        <span>{ data.title }</span>
      </div>
      <div>
        <h3>Descripción</h3>
        <span>{ data.description }</span>
      </div>
    </>
  )
};

export default CourseModule
