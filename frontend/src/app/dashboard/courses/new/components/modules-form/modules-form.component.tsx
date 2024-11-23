"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { MODULE_INITIAL_STATE } from "./modules-form.consts";
import { useState, ReactNode } from "react";
import { Module } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { Button } from "@/components/ui/button";
import LessonForm from "../lesson-form/lesson-form.component";
import { useContext } from "react";
import CourseLesson from "../course-lesson/course-lesson.component";
import RouteBtn from "../route-btn/route-btn.component";
import { CourseCtx } from "../../context/course-form.context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type ModuleViewProps = {
  title: string
  children: ReactNode
}

const ModulesForm = () => {
  const {
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<Module>(MODULE_INITIAL_STATE, MODULE_INITIAL_STATE);

  const [ showLesson, setShowLesson ] = useState(false);
  // const [ showModuleInfo, setShowModuleInfo ] = useState(false);
  const [ showModuleForm, setShowModuleForm ] = useState(true);
  // const [ lessons, setLessons ] = useState<Lesson[]>([]);
  const [ currentModule, setCurrentModule ] = useState(NaN);
  const { courseData, setCourseData, routeChanger } = useContext(CourseCtx);
  const deps = { handleSubmit, setCourseData, routeChanger, isDirty };

  return (
    <>
      {
        showLesson && 
          <LessonForm 
            moduleId={currentModule} 
            setShowLesson={setShowLesson}
          /> 
      }
      { showModuleForm &&
        <form className="flex flex-col gap-10">
          <Input 
            name="title" type="text" 
            label="Título del módulo" { ...controlledCommonProps } 
            placeholder="Nombrá tu curso o lección"
          />
          <Input 
            name="description" type="richtext" 
            label="Descripción" { ...controlledCommonProps } 
            placeholder="Escribe una descripción básica del proyecto"
          />
          <div className="flex gap-5 justify-end">
            <Button 
              type="button"
              onClick={ 
                handleSubmit(data => {
                  setCourseData!(prev => ({ ...prev, modules: [ ...prev.modules, data ]}))
                  setShowModuleForm(false)
                })
              }
              className="px-14 self-end border-primary-200 text-primary-200"
            >
              Guardar
            </Button>
            <Button 
              variant="outline" className="px-14 self-end border-red-500 text-red-500 hover:bg-red-500"
              onClick={() => setShowModuleForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      }
      { !showModuleForm &&
        <Button variant="outline" className="px-14" onClick={() => setShowModuleForm(true)}>
          Añadir módulo
        </Button>
      }
      { (!showModuleForm || !showLesson) &&
        <div className="flex flex-col items-end gap-5">
          <div className="w-full">
            { courseData.modules.map((m, idx) => ( 
              <Accordion key={`module-panel-${idx}`} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{ m.title }</AccordionTrigger>
                  <AccordionContent>
                    { m.description }
                    <div>
                      { courseData.modules[idx].lessons.map((l, idx) => (
                        <div className="flex flex-col gap-1" key={`lesson-${idx}`}>
                          <CourseLesson data={l} />
                        </div>
                      )) }
                    </div>
                    <Button variant="outline" className="px-14" onClick={() => {
                      setCurrentModule(idx)
                      setShowLesson(true)
                    }}>
                      Añadir lección
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )) }
          </div>
        </div>
      }
      <div className="absolute w-full mt-6 -ml-6 flex justify-between pt-5">
        <RouteBtn direction="prev" keyToUpdate="details" { ...deps } />
        <RouteBtn direction="next" keyToUpdate="details" { ...deps } />
      </div>
    </>
  )
};

// const ModuleView = ({ title, children }: ModuleViewProps) => {
//   return (
//     <div className={`bg-gray-100 rounded-lg px-5`}>
//       <h3>{ title }</h3>
//       { children }
//     </div>
//   )
// };

export default ModulesForm
