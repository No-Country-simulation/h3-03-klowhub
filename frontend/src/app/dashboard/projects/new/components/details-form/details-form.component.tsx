"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { PROJECT_DETAILS_INITIAL_STATE } from "./details-form.consts";
import { ProjectDetails } from "@/types/project.types";
import Input from "@/components/input/input.component";
import { IsClientProvider } from "@/contexts/is-client.context";
import RouteBtn from "../../../../../../components/route-btn/route-btn.component";
import { setDetailsData } from "../../context/project-form.actions";
import useProjectContext from "../../hooks/use-project-context.hook";

const DetailsForm = () => {
  const { state, dispatch } = useProjectContext();

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty },
    watch
  } = useGenerateForm<ProjectDetails>(PROJECT_DETAILS_INITIAL_STATE, state.details);

  // console.log(watch("budget"));

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
          { ...commonProps } 
        />
        <Input
          name="budget"
          type="range"
          label="Ingresa presupuesto estimado para tu proyecto"
          { ...controlledCommonProps }
        />
        <IsClientProvider>
          <Input 
            name="requiredKnowledge"
            type="select"
            label="Conocimientos necesarios"
            placeholder="Conocimientos necesarios"
            className="col-span-2"
            { ...controlledCommonProps }
          />
        </IsClientProvider>
        <Input
          name="requiredSkills"
          type="multitext"
          label="Para avanzar con tu propuesta, por favor indicá los requerimientos técnicos necesarios para el desarrollo de tu proyecto. Cuanto más detallada sea la información, mejor podremos adaptar la solución a tus necesidades específicas. Incluí aspectos como funcionalidades, integraciones, plataformas y cualquier otro detalle que consideres relevante."
          addButtonLabel="Añadir habilidad requerida"
          placeholder="¿Qué habilidad tiene tu candidato ideal?"
          className="col-span-2"
          { ...controlledCommonProps }
        />
        <IsClientProvider>
          <Input 
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
            { ...controlledCommonProps }
          />
        </IsClientProvider>
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn 
          setter={handleSubmit( data => dispatch(setDetailsData(data)) )}
          route="details"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
}

export default DetailsForm
