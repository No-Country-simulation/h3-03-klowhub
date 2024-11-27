import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Module } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { MODULE_INITIAL_STATE } from "../modules-section/modules-section.consts";
import { SetStateAction, useContext, Dispatch } from "react";
import { CourseCtx } from "../../context/course-form.context";
import { Button } from "@/components/ui/button";
import { addNewModule } from "../../context/course-form.actions";
import { setModulesData } from "../../context/course-form.actions";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import parse from "html-react-parser"
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import LessonForm from "../lesson-form/lesson-form.component";
import LessonsSection from "../lessons-section/lessons-section.component";

type Props = {
  moduleIdx: number
  setCurrentModule: Dispatch<SetStateAction<number>>
  setShowModuleForm: Dispatch<SetStateAction<boolean>>
}

const ModuleForm = ({ moduleIdx, setShowModuleForm, setCurrentModule }: Props) => {
  const courseCtx = useContext(CourseCtx);

  if (!courseCtx) throw new Error("no context found");

  const { state, dispatch } = courseCtx

  const {
    controlledCommonProps, 
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues
  } = useGenerateForm<Module>(MODULE_INITIAL_STATE, state.modules[moduleIdx] || MODULE_INITIAL_STATE);

  const [ showLessonForm, setShowLessonForm ] = useState(false)
  const [ currentLesson, setCurrentLesson ] = useState(NaN)

  return (
    <form className="flex flex-col gap-10">
      <Input 
        name="title" type="text" 
        label="Título del módulo" { ...controlledCommonProps } 
        placeholder="Nombrá tu módulo"
      />
      <Input 
        name="description" type="textarea" 
        label="Descripción" { ...controlledCommonProps } 
        placeholder="Detallá los contenidos del módulo"
      />
      { showLessonForm && 
        <LessonForm
          lessonIdx={currentLesson} 
          setShowLessonForm={setShowLessonForm} 
          updateModule={setValue}
          getValues={getValues}
          setCurrentLesson={setCurrentLesson}
        /> 
      }
      { !showLessonForm &&
        <LessonsSection moduleIdx={moduleIdx} watch={watch} setCurrentLesson={setCurrentLesson} setShowLessonForm={setShowLessonForm} /> //prop drilling
      }


      <div className="flex justify-between">
        <div className="flex gap-5">
          <Button 
            type="button"
            onClick={ 
              handleSubmit(data => {
                if (isNaN(moduleIdx)) {
                  dispatch(addNewModule(data))
                } else {
                  const updatedModules = state.modules.map((m, idx) => {
                    if (idx !== moduleIdx) return m;
                    return data
                  });
                  dispatch(setModulesData(updatedModules))
                };
                setShowModuleForm(false)
                reset()
                setCurrentModule(NaN)
              })
            }
            className="px-14 self-end border-primary-200"
          >
            Guardar Módulo
          </Button>
          { !showLessonForm &&
            <Button 
              type="button"
              variant="outline" className="px-14 self-end border-primary-200 text-primary-200 hover:primary-200 justify-self-end"
              onClick={() => { 
                setShowLessonForm(true) 
              }}
            >
              Añadir Lección
            </Button>
          }
        </div>
        { !showLessonForm &&
          <Button 
            variant="outline" className="px-14 self-end border-red-500 text-red-500 hover:bg-red-500 justify-self-end"
            onClick={() => { 
              console.log('cancelling...');
              setShowModuleForm(false) 
              reset()
              setCurrentModule(NaN)
            }}
          >
            Cancelar
          </Button>
        }
      </div>
    </form>

  )  
};

export default ModuleForm
