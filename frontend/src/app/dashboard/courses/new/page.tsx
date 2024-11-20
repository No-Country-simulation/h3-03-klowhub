import { getQueryParams } from "@/utils/route.utils";
import GeneralSection from "./_components/general-form/general-form.component";
import DetailsSection from "./_components/details.component";
import ModuleSection from "./_components/modules.component";
import PromotionsSection from "./_components/promotions.component";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";
import { advices } from "./consts";
import { Button } from "@/components/ui/button";

const CreateCoursePage = async () => {
  const { section } = await getQueryParams();

  return (
    <main className="flex flex-col gap-5">
      <div>
        <Tab section="general">Información general</Tab>
        <Tab section="details">Detalles del curso</Tab>
        <Tab section="modules">Módulos y lecciones</Tab>
        <Tab section="promotions">Promociones</Tab>
      </div>
      <div className="flex gap-28 bg-card rounded-lg p-6">
        <div className="w-3/4">
          { section === "general" && <GeneralSection /> }
          { section === "details" && <DetailsSection /> }
          { section === "modules" && <ModuleSection /> }
          { section === "promotions" && <PromotionsSection /> }
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
      <Button className="px-14 self-end">Continuar</Button>
  </main>
  )

};

export default  CreateCoursePage
