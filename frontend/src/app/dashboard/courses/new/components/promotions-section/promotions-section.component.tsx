"use client"

import { useState, useEffect } from "react";
import useUserContent from "../../../../../../hooks/use-user-content.hook";
import Tab from "@/components/tab/tab.component";
import RouteBtn from "../../../../../../components/route-btn/route-btn.component";
import { useWatch } from "react-hook-form";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { PROMOTION_INITIAL_STATE } from "./promotions-section.consts";
import useCourseContext from "../../hooks/use-course-context.hook";
import { Promotion } from "@/types/global.types";
import Input from "@/components/input/input.component";
import ProductCard from "@/components/product-card/product-card.component";
import { setPromotionData } from "../../context/course-form.actions";
import { Button } from "@/components/ui/button";
import Greeter from "@/components/greeter/greeter.component";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import promotionMock from "./promotions.mock.json"

type ContentType = "applications" | "courses"

const PromotionsSection = () => {
  const { state, dispatch, submitCourse } = useCourseContext();
  const pathname = usePathname()

  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useGenerateForm<Promotion>(PROMOTION_INITIAL_STATE, state.promotion || PROMOTION_INITIAL_STATE);

  const { controlledCommonProps: selectionProps } = useGenerateForm<{ selection: string }>({ selection: "yes" }, { selection: "yes" });

  const selection = useWatch({
    name: "selection",
    control: selectionProps.control,
    defaultValue: "yes"
  });

  const [ showSelector, setShowSelector ] = useState(true);
  const [ contentType, setContentType] = useState<ContentType>('courses');
  const { applications, courses } = useUserContent();
  const [ newCourseId, setNewCourseId ] = useState<string>();

  useEffect(() => {
    reset()
  }, [contentType, reset, showSelector])

  useEffect(() => {
    if (selection === "yes") setShowSelector(true);
    if (selection === "no") setShowSelector(false);
  }, [selection])

  useEffect(() => {
    console.log('promotionMock: ', promotionMock);
    dispatch(setPromotionData(promotionMock))
  }, [dispatch])

  return (
    <>
      { newCourseId &&
        <Greeter
          header="¡Felicitaciones! Tu curso/Leccion se publicó con exito"
          message="Ya está disponible para que estudiantes de todo el mundo lo descubran y aprovechen."
        >
          <Link 
            href={`/courses/${newCourseId}`}
            className={`${buttonVariants({ variant: "outline" })} px-10 bg-primary-500 border-none hover:bg-secondary-400`}
          >
            Ver curso publicado
          </Link>
          <Link
            href={`/dashboard/courses`}
            className={`${buttonVariants({ variant: "outline" })} px-10 border-primary-200 text-primary-200`}
          >
            Volver al dashboard
          </Link>
        </Greeter>
      }
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="font-bold">Fusiona tus cursos y apps, expande tus posibilidades</h3>
          <p>En AppSheetHub, te damos la libertad de combinar tus aplicaciones y cursos para crear soluciones únicas y personalizadas. No te limites a una sola herramienta: potencia tu creatividad uniendo conocimientos y funcionalidades para lograr un impacto mayor. Diseña, comparte y aprende como nunca antes. ¡El límite lo pones vos!</p>
        </div>
        <Input 
          name="selection"
          type="radio-group"
          options={[ 
            { value: "yes", label: "Sí" },
            { value: "no", label: "No" },
          ]} 
          { ...selectionProps }
        />
        { showSelector &&
          <div className="
            rounded-lg flex flex-col gap-5
            sm:p-5 sm:bg-gray-200
          ">
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
              <div className="
                grid grid-cols-1 gap-5
                md:grid-cols-2
                xl:grid-cols-3
              ">
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
                isPercentage
              />
            </form>
          </div>
        }
      </div>
      <div className="
        absolute w-full bottom-0 -ml-6 -mb-28 flex flex-col justify-between pt-5 items-center gap-5
        md:-mb-16
      ">
        <div className="w-full">
          <RouteBtn 
            setter={ handleSubmit( data => dispatch(setPromotionData(data)) ) }
            route="preview"
            isDirty={isDirty}
            variant="outline"
            className="md:hidden w-full hover:bg-primary-600 !important"
          >
            Vista previa del curso
          </RouteBtn>
        </div>
        
        <div className="flex justify-between w-full gap-5">
          <RouteBtn 
            setter={ handleSubmit( data => dispatch(setPromotionData(data)) ) }
            route="modules"
            isDirty={isDirty}
            className="mr-auto flex-1 md:grow-0"
          >
            Retroceder
          </RouteBtn>
          <RouteBtn 
            setter={ handleSubmit( data => dispatch(setPromotionData(data)) ) }
            route="preview"
            isDirty={isDirty}
            variant="outline"
            className="hidden md:block"
          >
            Vista previa del curso
          </RouteBtn>
          <Button 
            type="button"
            className="flex-1 md:grow-0"
            onClick={handleSubmit(async (promotion) => {
              const courseId = await submitCourse({ promotion }) 
              // setNewCourseId(courseId)
            })}
          >
            Publicar
          </Button>
        </div>
      </div>
    </>
  )
};

export default PromotionsSection
