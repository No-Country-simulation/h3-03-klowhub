"use client"

// import { useEffect } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { APPLICATION_DETAILS_INITIAL_STATE } from "./details-form.consts";
import Input from "@/components/input/input.component";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { setDetailsData } from "../../context/application-form.actions";
import useApplicationContext from "../../hooks/use-application-context.hook";
// import detailsMock from "./details-form.mock.json"
import { ApplicationDetails } from "@/types/application.types";

const DetailsForm = () => {
  const { state, dispatch } = useApplicationContext();

  const {
    // commonProps,
    controlledCommonProps, 
    handleSubmit,
    formState: { isDirty }
  } = useGenerateForm<ApplicationDetails>(APPLICATION_DETAILS_INITIAL_STATE, state.details);

  // useEffect(() => {
  //   console.log("inserting mocked data...");
  //   console.log('detailsMock: ', detailsMock);
  //
  //   dispatch(setDetailsData(detailsMock))
  // }, [dispatch])

  return (
    <>
      <form className="flex flex-col gap-10">
        <Input 
          name="fullDescription" type="richtext" 
          label="Hacé una descripción detallada de tu aplicación." 
          placeholder="Hacé una descripción detallada de tu aplicación."
          { ...controlledCommonProps } 
        />
        <Input 
          name="features" type="multitext" 
          label="Describe las características principales de tu app" 
          addButtonLabel="Añadir característica"
          placeholder="¿Qué función princpal quieres destacar?"
          { ...controlledCommonProps } 
        />
        <Input 
          name="views" type="multitext" 
          label="Vistas de la App" 
          addButtonLabel="Añadir vista"
          placeholder="Describe aqui una vista de tu app"
          { ...controlledCommonProps } 
        />
        <Input 
          name="appIncludes" type="multitext" 
          label="¿Qué recibirá el usuario al comprar esta App?" 
          addButtonLabel="Añadir item"
          placeholder="La compra incluye..."
          { ...controlledCommonProps } 
        />
        <Input 
          name="targetAudience" type="multitext" 
          label="Para quién es esta App" 
          addButtonLabel="Añadir item"
          placeholder="Esta app es para ti sí..."
          { ...controlledCommonProps } 
        />
      </form>
      <div className="
        absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5
      ">
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) ) }
          route="general"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Retroceder
        </RouteBtn>
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setDetailsData(data)) )}
          route="media"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default DetailsForm
