import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { getQueryParams } from "@/utils/route.utils";
import GeneralSection from "./_components/general-form/general-form.component";
import DetailsSection from "./_components/details.component";
import ModuleSection from "./_components/modules.component";
import PromotionsSection from "./_components/promotions.component";
import Tab from "@/components/tab/tab.component";


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
        <div className="bg-card rounded-lg">
          <div>
            { section === "general" && <GeneralSection /> }
            { section === "details" && <DetailsSection /> }
            { section === "modules" && <ModuleSection /> }
            { section === "promotions" && <PromotionsSection /> }
          </div>
        </div>
    </main>
  )

};

export default  CreateCoursePage
