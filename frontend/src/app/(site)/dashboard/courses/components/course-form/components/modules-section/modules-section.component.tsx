"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
// import CourseLesson from "../course-lesson/course-lesson.component";
import TempError from "@/components/temp-error/temp-error.component";
import RouteBtn from "@/components/route-btn/route-btn.component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import parse from "html-react-parser"
import { Pencil } from "lucide-react";
import ModuleForm from "../module-form/module-form.component";
import LessonsSection from "../lessons-section/lessons-section.component";
import useCourseContext from "../../hooks/use-course-context.hook";
// import modulesMock from "./modules.mock.json"
// import { setModulesData } from "../../context/course-form.actions";
import { Plus } from "lucide-react";
import styles from "@/styles/accordion.styles.module.css"

const ModulesSection = () => {
  const { state } = useCourseContext();
  const [currentModule, setCurrentModule] = useState(NaN);
  // const [showModuleForm, setShowModuleForm] = useState(state.modules.length === 0);
  const [showModuleForm, setShowModuleForm] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {showModuleForm &&

        <ModuleForm moduleIdx={currentModule} setCurrentModule={setCurrentModule} setShowModuleForm={setShowModuleForm} />
      }
      {(!showModuleForm) &&
        <div className="flex flex-col items-end gap-5">
          <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <Accordion type="single" collapsible className={`${styles['accordion-root']} px-5`}>
              {/* <TempError */}
              {/*   element="items del acordion" */}
              {/*   reason="el backend no esta enviando los modulos, la prop modules llega como indefinido" */}
              {/* /> */}
              {state && state.modules.map((m, mIdx) => (
                <AccordionItem key={`module-panel-${mIdx}`} value={`module-${mIdx}`}>
                  <AccordionTrigger>{m.title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-5">
                    <span>{parse(m.description)}</span>
                    <div className="flex gap-5 self-end">
                      <Button variant="outline" className="h-10 py-0 px-5 text-sm" onClick={() => {
                        setCurrentModule(mIdx)
                        setShowModuleForm(true)
                      }}>
                        <Pencil />
                        Editar Módulo
                      </Button>
                    </div>
                    <LessonsSection lessons={state.modules[mIdx].lessons} readOnly />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      }
      {!showModuleForm &&
        <Button
          type="button"
          variant="outline"
          className="
              px-3 self-end border-primary-200 text-primary-200 hover:primary-200 justify-self-end w-full
              sm:w-auto sm:px-14 
            "
          onClick={() => {
            setShowModuleForm(true)
          }}
        >
          <span>Añadir Módulo</span>
          <Plus />
        </Button>
      }
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5">
        <RouteBtn route="details" className="flex-1 md:grow-0">Retroceder</RouteBtn>
        <RouteBtn route="promotion" className="flex-1 md:grow-0">Continuar</RouteBtn>
      </div>
    </div>
  )
};

export default ModulesSection
