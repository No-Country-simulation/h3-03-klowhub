import { getQueryParams } from "@/utils/route.utils";
import GeneralForm from "./components/general-form/general-form.component";
import DetailsForm from "./components/details-form/details-form.component";
import ModuleSection from "./components/modules-section/modules-section.component";
import PromotionsSection from "./components/promotions-section/promotions-section.component";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";
import { advices } from "./consts";
import CourseCtxProvider from "./context/course-form.context";
import { CourseDetail } from "@/app/(site)/courses/components/detail/course-detail.component";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import { Suspense } from "react";

const CourseForm = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative ${section === "promotion" ? "mb-32" : "mb-28"}`}>
        { section !== "preview" &&
          <div>
            <Tab active={section === "general"} className={section !== "general" ? "hidden md:inline-block" : ""}>Información general</Tab>
            <Tab active={section === "details"} className={section !== "details" ? "hidden md:inline-block" : ""}>Detalles del curso</Tab>
            <Tab active={section === "modules"} className={section !== "modules" ? "hidden md:inline-block" : ""}>Módulos y lecciones</Tab>
            <Tab active={section === "promotion"} className={section !== "promotion" ? "hidden md:inline-block" : ""}>Promociones</Tab>
          </div>
        }
        <div className={`
          ${section !== "preview" ? "bg-card p-6" : ""}
          flex rounded-lg
          lg:gap-10
          xl:gap-20
          2xl:gap-40
        `}>
          <div className={`
            w-full
            lg:${section !== "preview" ? "w-3/4" : "w-full"}
          `}>
            <CourseCtxProvider>
              { section === "general" && <GeneralForm /> }
              { section === "details" && <DetailsForm /> }
              { section === "modules" && <ModuleSection /> }
              { section === "promotion" && <PromotionsSection /> }
              <Suspense>
                { 
                  section === "preview" && 
                    <IsClientProvider>
                      <CourseDetail /> 
                    </IsClientProvider>
                }
              </Suspense>
            </CourseCtxProvider>
          </div>
          { section !== "preview" &&
            <div className="
              hidden
              lg:block lg:w-1/4
              ">
              { 
                advices.map((adv, idx) => (
                  <FormAdvice 
                    key={`advice-${idx}`} 
                    src={adv.img.url} 
                    alt={adv.img.alt}
                    display={adv.section === section}
                    header={adv.header}
                    text={adv.text}
                  />
                ))
              }
            </div>
          }
        </div>
      </main>
    </>
  )

};

export default CourseForm
