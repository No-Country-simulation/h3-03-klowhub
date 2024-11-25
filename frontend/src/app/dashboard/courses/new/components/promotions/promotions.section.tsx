"use client"

import { useState, useEffect } from "react";
import useUserContent from "./hooks/use-user-content.hook";
import Tab from "@/components/tab/tab.component";
import RouteBtn from "../route-btn/route-btn.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { PROMOTION_INITIAL_STATE } from "./promotions.consts";
import { useContext } from "react";
import { CourseCtx } from "../../context/course-form.context";
import { CoursePromotion } from "@/types/courses.types";
import Input from "@/components/input/input.component";
import ProductCard from "@/components/product-card/product-card.component";
import { Button } from "@/components/ui/button";
import { setPromotionData } from "../../context/course-form.actions";

type ContentType = "applications" | "courses"

const PromotionsSection = () => {
  const courseCtx = useContext(CourseCtx);

  if (!courseCtx) throw new Error("no context found");

  const { state, dispatch } = courseCtx

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    watch,
    reset,
    formState: { isDirty }
  } = useGenerateForm<CoursePromotion>(PROMOTION_INITIAL_STATE, state.promotion);

  const [ showSelector, setShowSelector ] = useState(true);
  const [ contentType, setContentType] = useState<ContentType>('applications');
  const { applications, courses } = useUserContent();

  useEffect(() => {
    reset()
  }, [contentType, reset, showSelector])

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">Fusiona tus cursos y apps, expande tus posibilidades</h3>
          <p>En AppSheetHub, te damos la libertad de combinar tus aplicaciones y cursos para crear soluciones únicas y personalizadas. No te limites a una sola herramienta: potencia tu creatividad uniendo conocimientos y funcionalidades para lograr un impacto mayor. Diseña, comparte y aprende como nunca antes. ¡El límite lo pones vos!</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">¿Te gustaría ofrecer un descuento en alguno de tus otros productos al comprar este artículo?</h3>
          <div>
            <div className="flex gap-3">
              <input type="radio" name="promotion" onChange={() => setShowSelector(true)} checked={showSelector} />
              <label htmlFor="promotion">Sí</label>
            </div>
            <div className="flex gap-3">
              <input type="radio" name="promotion" onChange={() => setShowSelector(false)} checked={!showSelector} />
              <label htmlFor="promotion">No</label>
            </div>
          </div>
        </div>
        { showSelector &&
          <div className="bg-gray-200 rounded-lg p-5 flex flex-col gap-5">
            <h3 className="font-bold">Selecciona la app o curso que deseas incluir</h3>
            <div>
              <button onClick={() => setContentType("applications")}>
                <Tab active={contentType === "applications"}>Aplicaciones</Tab>
              </button>
              <button onClick={() => setContentType("courses")}>
                <Tab active={contentType === "courses"}>Cursos</Tab>
              </button>
            </div>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-5">
                { contentType === "applications"
                  ? applications.map((app, idx) => (
                    <Input 
                      key={`product-option-${idx}`} 
                      type="product-selector" 
                      name="product" 
                      productId={app.id}
                      productType={"application"}
                      { ...controlledCommonProps }
                    >
                      <ProductCard
                        key={`product-card-${idx}`}
                        data={app}
                        unlink
                        onlyInfo
                      />
                    </Input>
                  ))
                  : courses.map((cr, idx) => (
                    <Input
                      key={`product-option-${idx}`} 
                      type="product-selector" 
                      name="product" 
                      productId={cr.id} 
                      productType={"course"}
                      { ...controlledCommonProps }
                    >
                      <ProductCard
                        key={`product-card-${idx}`}
                        data={cr}
                        unlink
                        onlyInfo
                      />
                    </Input>
                  ))
                }
              </div>
              <Input 
                type="number" 
                name="percentage" 
                label="Establecé el porcentaje de descuento que querés ofrecer al crear este paquete." 
                { ...commonProps }
              />
            </form>
          </div>
        }
      </div>
      <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5">
        <RouteBtn 
          setter={ handleSubmit( data => dispatch(setPromotionData(data)) ) }
          route="modules"
          isDirty={isDirty}
        >
          Retroceder
        </RouteBtn>
        <div className="flex gap-5">
          <Button className="px-6 border-primary-200 text-primary-200" variant="outline">Vista previa del curso</Button>
          <Button className="px-6">Publicar</Button>
        </div>
      </div>
    </>
  )
};

export default PromotionsSection
