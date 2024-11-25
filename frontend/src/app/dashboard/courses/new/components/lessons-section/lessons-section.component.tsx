import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FieldValues, UseFormWatch } from "react-hook-form";
import parse from "html-react-parser"
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { OneOf } from "@/types/utils.types";
import { Lesson } from "@/types/courses.types";
import UploadedImage from "@/components/uploaded-image/uploaded-image.component";

type ReadOnly = {
  readOnly?: true
  lessons: Lesson[]
  moduleIdx: number
}

type FullFeatured<F extends FieldValues> = {
  moduleIdx: number
  watch: UseFormWatch<F>
  readOnly?: false
  setCurrentLesson?: Dispatch<SetStateAction<number>>
  setShowLessonForm?: Dispatch<SetStateAction<boolean>>
}

type Props<F extends FieldValues> =  OneOf<[ FullFeatured<F>, ReadOnly ]>

const LessonsSection = <F extends FieldValues>({ watch, readOnly, setCurrentLesson, setShowLessonForm, lessons, moduleIdx }: Props<F>) => {
  console.log('lessons: ', lessons);
  return (
    <Accordion type="single" collapsible className="px-5 bg-gray-100 rounded-lg">
      { (lessons || watch("lessons")).map((l, lIdx) => ( 
        <AccordionItem key={`module-panel-${lIdx}`} value={`module-${lIdx}`}>
          <AccordionTrigger>{ l.title }</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-5">
            <div>
              <h3 className="font-bold">Descripción</h3>
              <span>{ parse(l.description) }</span>
            </div>
            <div>
              <h3 className="font-bold">Contenido de la lección</h3>
              <div className="grid grid-cols-3 gap-5">
                { l.videos.map((v, vIdx) => (
                  <UploadedImage 
                    key={`module-${moduleIdx}-lesson-${vIdx}`}
                    src={URL.createObjectURL(v)}
                    deleteCb={() => {}}
                    readOnly={readOnly}
                  />
                )) }
              </div>
            </div>
            { !readOnly &&
              <div className="flex gap-5 self-end">
                <Button type="button" variant="outline" className="h-10 py-0 px-5 text-sm" onClick={() => {
                  setCurrentLesson!(lIdx)
                  setShowLessonForm!(true)
                }}>
                  <Pencil />
                  Editar Lección
                </Button>
              </div>
            }
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

  )   
};

export default LessonsSection
