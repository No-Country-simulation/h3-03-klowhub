import { getQueryParams } from "@/utils/route.utils";
import Tab from "@/components/tab/tab.component";
import FormAdvice from "@/components/form-advice/form-advice.component";
import { advices } from "./consts";
import ApplicationCtxProvider from "./context/application-form.context";

import GeneralForm from "./components/general-form/general-form.component";
import DetailsForm from "./components/details-form/details-form.component";
import MediaForm from "./components/media-form/media-form.component";
import PromotionsSection from "./components/promotions-section/promotions-section.component";
import { AppDetail } from "@/app/(site)/applications/components/detail/app-detail.component";
import { Suspense } from "react";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";

const ApplicationForm = async () => {
  const { section } = await getQueryParams();

  return (
    <>
      <main className={`flex flex-col gap-5 relative ${section === "promotion" ? "mb-32" : "mb-28"} ${section === "preview" ? "mt-8" : ""}`}>
        { section !== "preview" &&
          <div>
            <Tab active={section === "general"} className={section !== "general" ? "hidden md:inline-block" : ""}>Información general</Tab>
            <Tab active={section === "details"} className={section !== "media" ? "hidden md:inline-block" : ""}>Detalles</Tab>
            <Tab active={section === "media"} className={section !== "media" ? "hidden md:inline-block" : ""}>Multimedia y recursos</Tab>
            <Tab active={section === "promotion"} className={section !== "promotion" ? "hidden md:inline-block" : ""}>Promociones</Tab>
          </div>
        }
        <div className="
          flex bg-card rounded-lg p-6
          lg:gap-10
          xl:gap-20
          2xl:gap-40
          ">
          <div className={`
            w-full
            lg:${section !== "preview" ? "w-3/4" : "w-full"}
          `}>
            <ApplicationCtxProvider>
              { section === "general" && <GeneralForm /> }
              { section === "details" && <DetailsForm /> }
              { section === "media" && <MediaForm /> }
              { section === "promotion" && <PromotionsSection /> }
              <Suspense>
                { 
                  section === "preview" && 
                    <IsClientProvider>
                      <AppDetail /> 
                    </IsClientProvider>
                }
              </Suspense>
            </ApplicationCtxProvider>
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

export default ApplicationForm
