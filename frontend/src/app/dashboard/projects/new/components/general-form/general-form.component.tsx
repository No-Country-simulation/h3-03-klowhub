"use client"

import useGenerateForm from "@/hooks/use-generate-form.hook";
import { PROJECT_INFO_INITIAL_STATE } from "./general-form.consts";
import { ProjectInfo } from "@/types/project.types";
import Input from "@/components/input/input.component";
import { language, coreContent, functionalities, sector, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import RouteBtn from "../../../../../../components/route-btn/route-btn.component";
import { setGeneralData } from "../../context/project-form.actions";
import useProjectContext from "../../hooks/use-project-context.hook";

const GeneralForm = () => {
  const { state, dispatch } = useProjectContext();

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<ProjectInfo>(PROJECT_INFO_INITIAL_STATE, state.general);

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
          { ...commonProps } 
        />
        <Input
          name="platform"
          type="radio-group"
          label="Plataforma"
          options={[
            { value: "appsheet", label: "AppSheet" },
            { value: "powerapps", label: "PowerApps" },
          ]}
          className="col-span-2"
          { ...commonProps }
        />
      </form>
    </>
  )
}

export default GeneralForm
