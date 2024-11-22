import { useState } from "react";
import { Lesson } from "@/types/courses.types";
import parse from 'html-react-parser';
import { ChevronDown } from "lucide-react";

type Props = {
  data: Lesson
}

const CourseLesson = ({ data }: Props) => {
  const [ show, setShow ] = useState(false);

  return (
    <div className={`flex flex-col gap-5 p-4 rounded-lg bg-gray-200 ease-in-out duration-500 transition-all overflow-hidden ${show ? "h-auto" : "h-14"}`}>
      <button className="flex justify-between" onClick={() => setShow(prev => !prev)}>
        <h3 className="font-bold">{ data.title }</h3>
        <ChevronDown />
      </button>
      <div>
        <h3 className="font-bold">Descripción</h3>
        <span>{ parse(data.description) }</span>
      </div>
    </div>
  )
};

export default CourseLesson
