import { getQueryParams } from "@/utils/route.utils";
import GeneralSection from "./components/general-info-form/general-info-form.component";
import DetailsSection from "./components/details-form/details-form.component";
import ModuleSection from "./components/modules-form/modules-form.component";
import PromotionsSection from "./components/promotions/promotions.section";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";
import { advices } from "./consts";
import CourseCtxProvider from "./context/course-form.context";

const CreateCoursePage = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className="flex flex-col gap-5 relative mb-28">
        <div>
          <Tab section="general">Información general</Tab>
          <Tab section="details">Detalles del curso</Tab>
          <Tab section="modules">Módulos y lecciones</Tab>
          <Tab section="promotions">Promociones</Tab>
        </div>
        <div className="flex gap-40 bg-card rounded-lg p-6">
          <div className="w-3/4">
            <CourseCtxProvider>
              { section === "general" && <GeneralSection /> }
              { section === "details" && <DetailsSection /> }
              { section === "modules" && <ModuleSection /> }
              { section === "promotions" && <PromotionsSection /> }
            </CourseCtxProvider>
          </div>
          <div className="w-1/4">
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
        </div>
      </main>
    </>
  )

};

export default  CreateCoursePage
