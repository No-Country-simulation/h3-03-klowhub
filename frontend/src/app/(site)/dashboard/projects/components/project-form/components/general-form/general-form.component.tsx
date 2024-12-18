"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { useEffect } from "react";
import { PROJECT_INFO_INITIAL_STATE } from "./general-form.consts";
import { ProjectInfo } from "@/types/project.types";
import Input from "@/components/input/input.component";
import { sector, experienceLevel, workMethodology, requiredSkills } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setGeneralData } from "../../context/project-form.actions";
import useProjectContext from "../../hooks/use-project-context.hook";
import formMock from "./general-form.mock.json"
console.log('formMock: ', formMock);

const GeneralForm = () => {
  const { state, dispatch } = useProjectContext();

  const {
    commonProps,
    controlledCommonProps,
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<ProjectInfo>(PROJECT_INFO_INITIAL_STATE, state.general);

  // useEffect(() => {
  //   console.log("inserting mocked data...");
  //   // @ts-ignore: Unreachable code error
  //   dispatch(setGeneralData(formMock))
  // }, [dispatch])

  return (
    <>
      <form className="
        flex flex-col gap-y-8 gap-x-10 md:grid-rows-auto md:items-start
        md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 md:grid-cols-2
        lg:gap-x-48
        ">
        <Input
          name="title"
          type="text"
          label="Título del proyecto"
          placeholder="Ingresa el título del proyecto"
          className="col-span-2"
          {...commonProps}
        />
        <Input
          name="platform"
          type="radio-group"
          label="Plataforma"
          options={[
            { value: "appsheet", label: "AppSheet" },
            { value: "powerapps", label: "PowerApps" },
          ]}
          {...controlledCommonProps}
        />
        <Input
          name="description"
          type="textarea"
          label="Antes de comenzar, asegúrate de tener una idea clara de lo que necesitas. Esto incluye el tipo de trabajo, los resultados esperados y cualquier requisito específico."
          placeholder="Escribe una descripción básica del proyecto"
          className="col-span-2"
          {...commonProps}
        />
        <IsClientProvider>
          <Input
            name="sector"
            type="select"
            options={sector.items}
            label="Sector del proyecto"
            placeholder="Selecciona el sector"
            isMulti
            {...controlledCommonProps}
          />
          <Input
            name="methodology" type="select"
            options={workMethodology.items}
            label="Metodología de trabajo"
            placeholder="Ingresa la metodología de trabajo"
            {...controlledCommonProps}
          />
          <Input
            name="experienceLevel" type="select"
            options={experienceLevel.items}
            label="Nivel de experiencia"
            placeholder="Ingresa la metodología de trabajo"
            {...controlledCommonProps}
          />
        </IsClientProvider>
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn
          setter={handleSubmit(data => dispatch(setGeneralData(data)))}
          route="details"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
}

export default GeneralForm
