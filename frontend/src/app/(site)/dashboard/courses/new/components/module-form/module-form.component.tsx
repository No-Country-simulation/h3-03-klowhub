import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Module } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { MODULE_INITIAL_STATE } from "../modules-section/modules-section.consts";
import { SetStateAction, Dispatch } from "react";
import { Button } from "@/components/ui/button";
import { addNewModule } from "../../context/course-form.actions";
import { setModulesData } from "../../context/course-form.actions";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import LessonForm from "../lesson-form/lesson-form.component";
import LessonsSection from "../lessons-section/lessons-section.component";
import useCourseContext from "../../hooks/use-course-context.hook";

type Props = {
  moduleIdx: number
  setCurrentModule: Dispatch<SetStateAction<number>>
  setShowModuleForm: Dispatch<SetStateAction<boolean>>
}

const ModuleForm = ({ moduleIdx, setShowModuleForm, setCurrentModule }: Props) => {
  const { state, dispatch } = useCourseContext();

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
    <form className="flex flex-col gap-10 justify-between">
      <div className="relative">
        <Input 
          name="title" type="text" 
          label="Título del módulo" { ...controlledCommonProps } 
          placeholder="Nombrá tu módulo"
        />
        { !showLessonForm &&
          <X 
            className="absolute top-0 right-0 cursor-pointer text-primary-300"
            onClick={() => { 
              console.log('cancelling...');
              setShowModuleForm(false) 
              reset()
              setCurrentModule(NaN)
            }}
          />
        }
      </div>
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


      <div className="flex sm:flex-row flex-col justify-between gap-3">
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
            className="
              px-3 self-end border-primary-200 w-full 
              sm:w-auto sm:px-14
            "
          >
            Guardar Módulo
          </Button>
          { !showLessonForm &&
            <Button 
              type="button"
              variant="outline" 
              className="
                px-3 self-end border-primary-200 text-primary-200 hover:primary-200 justify-self-end w-full
                sm:w-auto sm:px-14 
              "
              onClick={() => { 
                setShowLessonForm(true) 
              }}
            >
              <span>Añadir Lección</span>
              <Plus />
            </Button>
          }
      </div>
    </form>

  )  
};

export default ModuleForm
