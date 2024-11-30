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

const CreateCoursePage = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative ${section === "promotion" ? "mb-32" : "mb-28"}`}>
        <div>
          <Tab active={section === "general"} className={section !== "general" ? "hidden md:inline-block" : ""}>Información general</Tab>
          <Tab active={section === "details"} className={section !== "details" ? "hidden md:inline-block" : ""}>Detalles del curso</Tab>
          <Tab active={section === "modules"} className={section !== "modules" ? "hidden md:inline-block" : ""}>Módulos y lecciones</Tab>
          <Tab active={section === "promotion"} className={section !== "promotion" ? "hidden md:inline-block" : ""}>Promociones</Tab>
        </div>
        <div className="
          flex bg-card rounded-lg p-6
          lg:gap-10
          xl:gap-20
          2xl:gap-40
          ">
          <div className="
            w-full
            lg:w-3/4
            ">
            <CourseCtxProvider>
              {section === "general" && <GeneralForm />}
              {section === "details" && <DetailsForm />}
              {section === "modules" && <ModuleSection />}
              {section === "promotion" && <PromotionsSection />}
              {section === "preview" && <CourseDetail />}
            </CourseCtxProvider>
          </div>
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
        </div>
      </main>
    </>
  )

};

export default CreateCoursePage
