"use client"

// import { useEffect } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { PROJECT_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { ProjectDetails } from "@/types/project.types";
import Input from "@/components/input/input.component";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setDetailsData } from "../../context/project-form.actions";
import useProjectContext from "../../hooks/use-project-context.hook";
// import formMock from "./details-form.mock.json"
import { requiredSkills } from "@/consts/filters.consts";
const DetailsForm = () => {

  const { state, dispatch } = useProjectContext();

  const {
    commonProps,
    controlledCommonProps,
    handleSubmit,
    formState: { isDirty },
  } = useGenerateForm<ProjectDetails>(PROJECT_DETAILS_INITIAL_STATE, state.details);

  return (
    <>
      <form className="
        flex flex-col gap-y-8 gap-x-10 md:grid-rows-auto md:items-start
        md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 md:grid-cols-2
        lg:gap-x-48
        ">
        <Input
          name="days"
          type="number"
          label="Ingresa los tiempos estimados"
          placeholder="Ingresa la cantidad de días"
          {...commonProps}
        />
        <div className="w-full flex flex-col gap-5">
          <label>Ingresa presupuesto estimado para tu proyecto</label>
          <div className="w-full flex gap-5 items-center">
            <Input
              name="minBudget"
              type="number"
              {...controlledCommonProps}
            />
            <span className="font-bold">-</span>
            <Input
              name="maxBudget"
              type="number"
              {...controlledCommonProps}
            />
          </div>
        </div>
        <IsClientProvider>
          <Input
            name="requiredSkills" type="select"
            options={requiredSkills.items}
            label="Habilidades requeridas"
            placeholder="Habilidades requeridas"
            isMulti
            {...controlledCommonProps}
          />
        </IsClientProvider>
        <Input
          name="technicalRequirements"
          type="multitext"
          label="Para avanzar con tu propuesta, por favor indicá los requerimientos técnicos necesarios para el desarrollo de tu proyecto. Cuanto más detallada sea la información, mejor podremos adaptar la solución a tus necesidades específicas. Incluí aspectos como funcionalidades, integraciones, plataformas y cualquier otro detalle que consideres relevante."
          addButtonLabel="Añadir requerimiento técnico"
          placeholder="Requerimiento técnico"
          className="col-span-2"
          {...controlledCommonProps}
        />
        <Input
          name="additionalRequirements"
          type="multitext"
          label="Indicá que requisitos adicionales esperas de tus candidatos"
          addButtonLabel="Añadir requisito adicional"
          placeholder="¿Qué requisito adicional debería tener tu cantidato?"
          className="col-span-2"
          {...controlledCommonProps}
        />
        <IsClientProvider>
          <Input
            entity="project"
            name="assets" type="upload"
            filetypes={{
              "image/*": [".png", ".jpg"],
              "application/pdf": [".pdf"],
              "video/mp4": [".mp4"]
            }}
            label="Adjunta aquí los archivos que consideres necesarios para este proyecto."
            dropzoneLabel="Adjunta aquí los archivos que consideres necesarios para este proyecto."
            isMulti
            limit={99999}
            {...controlledCommonProps}
          />
        </IsClientProvider>
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5">
        <RouteBtn
          setter={handleSubmit(data => dispatch(setDetailsData(data)))}
          route="general"
          isDirty={isDirty}
        >
          Regresar
        </RouteBtn>
        <RouteBtn
          setter={handleSubmit(data => {
            console.log('data: ', data);
            dispatch(setDetailsData(data))
          })}
          route="preview"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
}

export default DetailsForm
