"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { MODULE_INITIAL_STATE } from "./modules-section.consts";
import { useState } from "react";
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
import parse from "html-react-parser"
import { Pencil } from "lucide-react";
import { Plus } from "lucide-react";
import { addNewModule, setModulesData } from "../../context/course-form.actions";

const ModulesForm = () => {
  const courseCtx = useContext(CourseCtx);

  if (!courseCtx) throw new Error("no context found");

  const { state, dispatch } = courseCtx

  const [ currentEditingModule, setCurrentEditingModule ] = useState(NaN);

  const {
    controlledCommonProps, 
    handleSubmit,
    reset
  } = useGenerateForm<Module>(MODULE_INITIAL_STATE, state.modules[currentEditingModule]);

  const [ showLessonForm, setShowLessonForm ] = useState(false);
  const [ showModuleForm, setShowModuleForm ] = useState(!Boolean(state.modules.length));
  const [ currentModule, setCurrentModule ] = useState(NaN);

  return (
    <div>
      { showLessonForm && 
          <LessonForm 
            moduleId={currentModule} 
            setShowLessonForm={setShowLessonForm}
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
                  if (isNaN(currentEditingModule)) {
                    dispatch(addNewModule(data))
                  } else {
                    const updatedModules = state.modules.map((m, idx) => {
                      if (idx !== currentEditingModule) return m;
                      return data
                    });
                    dispatch(setModulesData(updatedModules))
                  };
                  setShowModuleForm(false)
                  reset()
                  setCurrentEditingModule(NaN)
                })
              }
              className="px-14 self-end border-primary-200 text-primary-200"
            >
              Guardar
            </Button>
            <Button 
              variant="outline" className="px-14 self-end border-red-500 text-red-500 hover:bg-red-500"
              onClick={() => { 
                setShowModuleForm(false) 
                reset()
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      }
      { (!showModuleForm && !showLessonForm) &&
        <div className="flex flex-col items-end gap-5">
          <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
              <Accordion type="single" collapsible className="px-5">
                { state.modules.map((m, idx) => ( 
                  <AccordionItem key={`module-panel-${idx}`} value={`module-${idx}`}>
                    <AccordionTrigger>{ m.title }</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-5">
                      <span>{ parse(m.description) }</span>
                      <div className="flex gap-5 self-end">
                        <Button variant="outline" className="h-10 py-0 px-5 text-sm" onClick={() => {
                          setCurrentEditingModule(idx)
                          setShowModuleForm(true)
                        }}>
                          <Pencil />
                          Editar Módulo
                        </Button>
                        <Button variant="outline" className="h-10 py-0 py-0 px-5 text-sm" onClick={() => {
                          setCurrentModule(idx)
                          setShowLessonForm(true)
                        }}>
                          <Plus />
                          Añadir lección
                        </Button>
                      </div>
                      <div className="bg-gray-100">
                        { state.modules[idx].lessons.map((l, idx) => (
                          <div className="flex flex-col gap-1" key={`lesson-${idx}`}>
                            <CourseLesson data={l} />
                          </div>
                        )) }
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )) }
              </Accordion>
          </div>
        </div>
      }
      { (!showModuleForm && !showLessonForm) &&
        <Button variant="outline" className="px-14" onClick={() => setShowModuleForm(true)}>
          Añadir módulo
        </Button>
      }
      <div className="absolute w-full mt-6 -ml-6 flex justify-between pt-5">
        <RouteBtn route="details">Retroceder</RouteBtn>
        <RouteBtn route="promotion">Continuar</RouteBtn>
      </div>
    </div>
  )
};

export default ModulesForm
