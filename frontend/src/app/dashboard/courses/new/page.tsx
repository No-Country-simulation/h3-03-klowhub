import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { getQueryParams } from "@/utils/route.utils";
import GeneralSection from "./_components/general-form/general-form.component";
import DetailsSection from "./_components/details.component";
import ModuleSection from "./_components/modules.component";
import PromotionsSection from "./_components/promotions.component";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";

const CreateCoursePage = async () => {
  const { section } = await getQueryParams();

  return (
    <main className="flex flex-col gap-5">
      <BreadCrumb />
      <h1 className="font-bold">Lanza tu curso: Comparte tu conocimiento</h1>
      <div>
        <Tab section="general">Información general</Tab>
        <Tab section="details">Detalles del curso</Tab>
        <Tab section="modules">Módulos y lecciones</Tab>
        <Tab section="promotions">Promociones</Tab>
      </div>
      <div className="flex gap-10 bg-card rounded-lg">
        <div className="w-3/4">
          { section === "general" && <GeneralSection /> }
          { section === "details" && <DetailsSection /> }
          { section === "modules" && <ModuleSection /> }
          { section === "promotions" && <PromotionsSection /> }
        </div>
        <div className="w-1/4">
          { section === "general" &&
            <FormAdvice src="/imgs/generic-01.webp" width={1024} height={1024} alt="">
              Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a recursos exclusivos que te ayudarán a mejorar tus habilidades y maximizar el potencial de tus proyectos.
            </FormAdvice>
          }
          { section === "details" &&
            <FormAdvice src="/imgs/generic-01.webp" width={1024} height={1024} alt="">
              Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a recursos exclusivos que te ayudarán a mejorar tus habilidades y maximizar el potencial de tus proyectos.
            </FormAdvice>
          }
          { section === "modules" &&
            <FormAdvice src="/imgs/generic-01.webp" width={1024} height={1024} alt="">
              Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a recursos exclusivos que te ayudarán a mejorar tus habilidades y maximizar el potencial de tus proyectos.
            </FormAdvice>
          }
          { section === "promotions" &&
            <FormAdvice src="/imgs/generic-01.webp" width={1024} height={1024} alt="">
              Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a recursos exclusivos que te ayudarán a mejorar tus habilidades y maximizar el potencial de tus proyectos.
            </FormAdvice>
          }
      </div>
      </div>
  </main>
  )

};

export default  CreateCoursePage
