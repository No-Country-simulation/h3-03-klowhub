"use client"

import { useEffect } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { COURSE_INFO_INITIAL_STATE } from "./general-form.consts";
import { CourseInfo } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import { language, coreContent, functionalities, sector, toolsAndPlatforms } from "@/consts/filters.consts";
import { IsClientProvider } from "@/contexts/is-client.context";
import { CircleAlert } from "lucide-react";
import RouteBtn from "../../../../../../components/route-btn/route-btn.component";
import { setGeneralData } from "../../context/course-form.actions";
import useCourseContext from "../../hooks/use-course-context.hook";
import formMock from "./course-general-form.mock.json"

const GeneralForm = () => {
  const { state, dispatch } = useCourseContext();

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<CourseInfo>(COURSE_INFO_INITIAL_STATE, state.general);

  useEffect(() => {
    console.log('inserting mocked data...');
    console.log('formMock: ', formMock);
    dispatch(setGeneralData(formMock))
  }, [dispatch])
  return (
    <>
      <form className="
        flex flex-col gap-y-8 gap-x-10 md:grid-rows-auto md:items-start
        md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 md:grid-cols-2
        lg:gap-x-48
        ">
        <Input 
          name="title" type="text"
          label="Título del curso / lección" { ...commonProps } 
          placeholder="Nombrá tu curso o lección"
          className="w-full"
        />
        <div className="
          text-sm font-bold flex gap-3 col-span-2 bg-gray-100 rounded-2xl px-4 py-2 w-full
          sm:px-5 sm:py-3
          sm:gap-5
          lg:w-[650px]
          ">
          <div><CircleAlert /></div>
          <span>El contenido gratuito ofrece acceso limitado a [características breves del contenido gratuito]. El contenido premium desbloquea [principales beneficios del contenido de pago]. Más información en nuestra <span className="text-secondary-400">[documentación]</span>.</span>
        </div>
        <Input
          name="freeCourse"
          options={[ 
            { value: "free", label: "Gratuito" },
            { value: "payed", label: "Pago" },
          ]} 
          type="radio-group"
          label="¿Qué tipo de contenido estás buscando: gratuito o premium?" { ...commonProps }
          className="w-full"
        />
        <Input 
          name="contentType" 
          options={[ 
            { value: "course", label: "Curso" },
            { value: "lesson", label: "Lección" },
          ]} 
          type="radio-group" 
          label="Seleccioná si vas a crear un curso  o una lección." { ...commonProps } 
        />
        <Input 
          name="shortDescription" type="textarea" 
          label="Contá de qué trata, en no más de 3 líneas." { ...controlledCommonProps } 
          placeholder="Escribí una descripción básica del proyecto"
          className="col-span-2"
        />
        <Input 
          name="targetAudience" type="textarea" 
          label="¿Para quién es este curso?" { ...controlledCommonProps } 
          placeholder="Detallá el perfil de tu público objetivo"
          className="col-span-2"
        />
        <Input
          name="level" 
          options={[
            { value: "basic", label: "Básico" },
            { value: "intermediate", label: "Intermedio" }
          ]}
          type="radio-group"
          label="Nivel de competencia" { ...commonProps }
        />
        <Input 
          name="platform"
          options={[
            { value: "appsheet", label: "AppSheet" },
            { value: "powerapps", label: "PowerApps" },
          ]}
          type="radio-group" 
          label="Plataforma" { ...commonProps } 
        />
        <IsClientProvider>
          <Input 
            name="language" type="select" options={language.items} 
            label="Elige el idioma del curso" { ...controlledCommonProps } 
            placeholder="Seleccionar idioma"
          />
          <Input 
            name="coreContent" type="select" options={coreContent.items} 
            label="Define el contenido de tu curso" { ...controlledCommonProps } 
            placeholder="Pilar de contenido"
            isMulti
          />
          <Input 
            name="functionalities" type="select" options={functionalities.items} 
            label="Funcionalidades" { ...controlledCommonProps } 
            placeholder="Funcionalidades"
            isMulti
          />
          <Input 
            name="sector" type="select" options={sector.items} 
            label="Elige el sector al que deseas dirigir tu curso" { ...controlledCommonProps } 
            placeholder="Seleccionar sector"
            isMulti
          />
          <Input 
            name="tools" type="select" options={toolsAndPlatforms.items} 
            label="Herramientas y plataformas" { ...controlledCommonProps } 
            placeholder="Herramientas y plataformas"
            isMulti
          />
          <Input 
            name="tags" type="select" options={functionalities.items} 
            label="Agrega etiquetas relacionadas" { ...controlledCommonProps } 
            placeholder="Selecciona las etiquetas"
            isMulti
          />
        </IsClientProvider>
      </form>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-end pt-5">
        <RouteBtn 
          setter={handleSubmit( data => dispatch(setGeneralData(data)) )}
          route="details"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default GeneralForm
