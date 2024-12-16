import { getQueryParams } from "@/utils/route.utils";
import GeneralForm from "./components/general-form/general-form.component";
import DetailsForm from "./components/details-form/details-form.component";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";
import { advices } from "./consts";
import ProjectCtxProvider from "./context/project-form.context";
import ProjectInfo from "../../../../projects/[id]/components/project-info/project-info.component";

const ProjectForm = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative ${section === "promotion" ? "mb-32" : "mb-28"}`}>
        <div>
          <Tab active={section === "general"} className={section !== "general" ? "hidden md:inline-block" : ""}>Información general</Tab>
          <Tab active={section === "details"} className={section !== "details" ? "hidden md:inline-block" : ""}>Detalles del curso</Tab>
          <Tab active={section === "preview"} className={section !== "preview" ? "hidden md:inline-block" : ""}>Publicar proyecto</Tab>
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
            <ProjectCtxProvider>
              { section === "general" && <GeneralForm /> }
              { section === "details" && <DetailsForm /> }
              { section === "preview" && <ProjectInfo /> }
            </ProjectCtxProvider>
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

export default ProjectForm
