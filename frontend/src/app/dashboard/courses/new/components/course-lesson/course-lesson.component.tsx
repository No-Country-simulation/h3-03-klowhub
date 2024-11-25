import { Lesson } from "@/types/courses.types";
import parse from 'html-react-parser';
import { AccordionContent, AccordionTrigger, AccordionItem } from "@radix-ui/react-accordion";

type Props = {
  data: Lesson
  lessonIdx: number
  moduleIdx: number
}

const CourseLesson = ({ data, lessonIdx, moduleIdx }: Props) => {
  const { title, description } = data;

  return (
    <AccordionItem value={`module-${moduleIdx}-lesson-${lessonIdx}`}>
      <AccordionTrigger>{ title }</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-5">
        <span>{ parse(description) }</span>
      </AccordionContent>
    </AccordionItem>

  )
};

export default CourseLesson
