import { getQueryParams } from "@/utils/route.utils";
import GeneralForm from "./components/general-form/general-form.component";
import DetailsForm from "./components/details-form/details-form.component";
import ModuleSection from "./components/modules-section/modules-section.component";
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
          <Tab active={section === "general"}>Información general</Tab>
          <Tab active={section === "details"}>Detalles del curso</Tab>
          <Tab active={section === "modules"}>Módulos y lecciones</Tab>
          <Tab active={section === "promotion"}>Promociones</Tab>
        </div>
        <div className="flex gap-40 bg-card rounded-lg p-6">
          <div className="w-3/4">
            <CourseCtxProvider>
              { section === "general" && <GeneralForm /> }
              { section === "details" && <DetailsForm /> }
              { section === "modules" && <ModuleSection /> }
              { section === "promotion" && <PromotionsSection /> }
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
