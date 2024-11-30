"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
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
import RouteBtn from "@/components/route-btn/route-btn.component";

const ModulesForm = () => {
  const courseCtx = useContext(CourseCtx);

  if (!courseCtx) throw new Error("no context found");

  const { state } = courseCtx
  const [currentModule, setCurrentModule] = useState(NaN);
  const [showModuleForm, setShowModuleForm] = useState(!Boolean(state.modules.length));

  return (
    <div>
      {showModuleForm &&
        <ModuleForm moduleIdx={currentModule} setCurrentModule={setCurrentModule} setShowModuleForm={setShowModuleForm} />
      }
      {(!showModuleForm) &&
        <div className="flex flex-col items-end gap-5">
          <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <Accordion type="single" collapsible className="px-5">
              {state.modules.map((m, mIdx) => (
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
                    <LessonsSection moduleIdx={mIdx} lessons={state.modules[mIdx].lessons} readOnly />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      }
      {!showModuleForm &&
        <Button variant="outline" className="px-14" onClick={() => setShowModuleForm(true)}>
          Añadir módulo
        </Button>
      }
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5">
        <RouteBtn route="details" className="flex-1 md:grow-0">Retroceder</RouteBtn>
        <RouteBtn route="promotion" className="flex-1 md:grow-0">Continuar</RouteBtn>
      </div>
    </div>
  )
};

export default ModulesForm
