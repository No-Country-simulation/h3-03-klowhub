"use client"

import { useEffect } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { ApplicationInfo } from "@/types/application.types";
import Input from "@/components/input/input.component";
import { language, functionalities, sector, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import useApplicationContext from "../../hooks/use-application-context.hook";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setGeneralData } from "../../context/application-form.actions";
import { APPLICATION_INFO_INITIAL_STATE } from "./general-form.consts";
import generalMock from "./general-form.mock.json"

const GeneralForm = () => {
  const { state, dispatch } = useApplicationContext();

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<ApplicationInfo>(APPLICATION_INFO_INITIAL_STATE, state.general);

  useEffect(() => {
    console.log("inserting generalMock: ", generalMock);
    dispatch(setGeneralData(generalMock))
  }, [dispatch])

  return (
    <>
      <form className="
        flex flex-col gap-y-8 gap-x-10 md:grid-rows-auto md:items-start
        md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 md:grid-cols-2
        lg:gap-x-48
        ">
        <Input 
          name="name" type="text"
          label="Dale un nombre atractivo a tu app." { ...commonProps } 
          placeholder="Escribe el nombre de esta app"
          className="w-full"
        />
        <Input 
          name="summarizedDescription" type="textarea" 
          label="Describí brevemente la función principal de tu aplicación en 1-2 líneas. Contanos cuál es la funcionalidad principal de tu app." { ...controlledCommonProps } 
          placeholder="Escribe una descripción básica de esta app"
          className="col-span-2"
        />
        <Input 
          name="platform"
          options={[
            { value: "appsheet", label: "AppSheet" },
            { value: "powerapps", label: "PowerApps" },
          ]}
          type="radio-group" 
          label="Plataforma" { ...controlledCommonProps } 
          className="col-span-2"
        />
        <IsClientProvider>
          <Input 
            name="language" type="select" options={language.items} 
            label="Elige el idioma de la app" { ...controlledCommonProps } 
            placeholder="Seleccionar idioma"
          />
          <Input 
            name="sector" type="select" options={sector.items} 
            label="Elige el sector al que deseas dirigir la app" { ...controlledCommonProps } 
            placeholder="Seleccionar sector"
            isMulti
          />
          <Input 
            name="toolsAndPlatforms" type="select" options={toolsAndPlatforms.items} 
            label="Selecciona sus herramientas" { ...controlledCommonProps } 
            placeholder="Herramientas"
            isMulti
          />
          <Input 
            name="functionalities" type="select" options={functionalities.items} 
            label="Agrega las funcionalidades relacionadas" { ...controlledCommonProps } 
            placeholder="Funcionalidades"
            isMulti
          />
        </IsClientProvider>
        <Input 
          name="target" type="textarea" 
          label="Para quién es esta App" { ...controlledCommonProps } 
          placeholder="Escribe para quien esta dirigido esta app"
          className="col-span-2"
        />
        <Input 
          name="advantages" type="textarea" 
          label="Ventajas de tener esta app" { ...controlledCommonProps } 
          placeholder="Escribe los beneficios que ofrece esta app"
          className="col-span-2"
        />
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn 
          setter={handleSubmit( data => dispatch(setGeneralData(data)) )}
          route="media"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default GeneralForm
