"use client"

import { useState } from "react";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import Input from "@/components/input/input.component";
import Tab from "@/components/tab/tab.component";
import ProductCard from "@/components/product-card/product-card.component";

import { PROMOTION_INITIAL_STATE } from "../promotions-section/promotions-section.consts";

import { Promotion } from "@/types/global.types";

import useUserContent from "@/hooks/use-user-content.hook";
import useCourseContext from "../../hooks/use-course-context.hook";

const PromotionForm = () => {
  const { state, dispatch, submitCourse } = useCourseContext();
  const {
    commonProps, 
    controlledCommonProps, 
    handleSubmit,
    reset,
    formState: { isDirty }
  } = useGenerateForm<Promotion>(PROMOTION_INITIAL_STATE, state.promotion || PROMOTION_INITIAL_STATE);

  const [ contentType, setContentType ] = useState<"applications" | "courses">("applications")
  const { applications, courses } = useUserContent();

  return (
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
  )   
};
