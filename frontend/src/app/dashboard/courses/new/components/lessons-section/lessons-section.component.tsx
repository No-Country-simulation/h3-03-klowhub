import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { UseFormWatch } from "react-hook-form";
import parse from "html-react-parser"
import { Pencil } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { OneOf } from "@/types/utils.types";
import { Lesson, Module } from "@/types/courses.types";
import FileBadge from "@/components/file-badge/file-badge.component";

type ReadOnly = {
  readOnly?: true
  lessons: Lesson[]
}

type FullFeatured = {
  moduleIdx: number
  watch: UseFormWatch<Module>
  readOnly?: false
  setCurrentLesson?: Dispatch<SetStateAction<number>>
  setShowLessonForm?: Dispatch<SetStateAction<boolean>>
}

type Props =  OneOf<[ FullFeatured, ReadOnly ]>

const LessonsSection = ({ watch, readOnly, setCurrentLesson, setShowLessonForm, lessons }: Props) => {
  return (
    <Accordion type="single" collapsible className="px-5 bg-gray-100 rounded-lg">
      { (lessons || watch("lessons")).map((l, lIdx) => ( 
        <AccordionItem key={`module-panel-${lIdx}`} value={`module-${lIdx}`}>
          <AccordionTrigger>{ l.title }</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-5">
            <div>
              <h3 className="font-bold mb-5">Descripción</h3>
              <span>{ parse(l.description) }</span>
            </div>
            <div>
              <h3 className="font-bold mb-5">Contenido de la lección</h3>
              <div className="grid grid-cols-3 gap-5">
                { l.video &&
                  <video width={l.video.width} height={l.video.height} controls>
                    <source src={l.video.url} type="video/mp4"></source>
                  </video>
                }
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-5">Material adicional</h3>
              <div className="flex flex-col items-start gap-5">
                { l.documents.map((d, dIdx) => (
                  <FileBadge key={`resource-${dIdx}`} data={d} />
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
