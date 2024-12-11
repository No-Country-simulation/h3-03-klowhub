"use client"

import { useState, useEffect } from "react";

import RouteBtn from "@/components/route-btn/route-btn.component";
import { APPLICATION_MEDIA_INITIAL_STATE } from "./media-form.consts";
import Input from "@/components/input/input.component";
import { setMediaData } from "../../context/application-form.actions";

import useGenerateForm from "@/hooks/use-generate-form.hook";
import useApplicationContext from "../../hooks/use-application-context.hook";

import { ApplicationMedia } from "@/types/application.types";
import { Badge } from "@/components/ui/badge";
import mediaMock from "./media-form.mock.json"

const MediaForm = () => {
  const { state, dispatch } = useApplicationContext();

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useGenerateForm<ApplicationMedia>(APPLICATION_MEDIA_INITIAL_STATE, state.media || APPLICATION_MEDIA_INITIAL_STATE);

  // const [ contentType, setContentType] = useState<ContentType>('applications');
  //
  // useEffect(() => {
  //   reset()
  // }, [contentType, reset])

  useEffect(() => {
    console.log("inserting mediaMock: ", mediaMock);
    dispatch(setMediaData(mediaMock))
  }, [dispatch])

  return (
    <>
      <form className="
        flex flex-col gap-y-8 gap-x-10 md:grid-rows-auto md:items-start
        md:grid md:grid-cols-2 md:gap-x-20 md:gap-y-10 md:grid-cols-2
        lg:gap-x-48
      ">
        <div className="flex flex-col gap-5 col-span-2 items-start">
          <Input 
            name="coverImg" type="upload"
            filetypes={{ "image/*": [".png", ".jpg"] }}
            label="Subí una imagen para tu aplicación"
            dropzoneLabel="Sube una imagen representativa de la app"
            className="w-full md:w-76 col-span-2"
            { ...controlledCommonProps }
          />
          <Badge className="px-3 py-2 bg-gray-100 text-primary-300 shrink-0">Esta será la imágen que se visualizará</Badge>
        </div>
        <Input 
          name="assets" type="upload"
          filetypes={{ "image/*": [".png", ".jpg"] }}
          label="Puede agregar hasta 5 imágenes o videos"
          dropzoneLabel="Sube una imagen representativa de la app"
          className="col-span-2"
          isMulti limit={5}
          { ...controlledCommonProps }
        />
        <h3 className="col-span-2 font-bold">Agregá un enlace para que los usuarios puedan ver una demo o preview de la app en acción.</h3>
        <div className="col-span-2 flex flex-col gap-5">
          <h3>Versión Desktop</h3>
          <Input 
            name="desktopLink" type="link" 
            className="w-full col-span-2"
            { ...controlledCommonProps } 
          />
        </div>
        <div className="col-span-2 flex flex-col gap-5">
          <h3>Versión Mobile</h3>
          <Input 
            name="mobileLink" type="link" 
            className="w-full col-span-2"
            { ...controlledCommonProps } 
          />
        </div>
      </form>
      <div className="
        absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5 gap-5
      ">
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setMediaData(data)) ) }
          route="general"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Retroceder
        </RouteBtn>
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setMediaData(data)) )}
          route="promotion"
          className="flex-1 md:grow-0"
          isDirty={isDirty}
        >
          Continuar
        </RouteBtn>
      </div>
    </>
  )
};

export default MediaForm
