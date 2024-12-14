"use client"

import { FC, ReactNode, useState } from "react";
import { AppInfo } from "./app-info.section";
import { ShareSection } from "@/app/(site)/courses/components/detail/share-section";
import PageFilters from "@/components/page-filters/page-filters.component";
import { ReviewsSection } from "@/app/(site)/courses/components/detail/reviews.section";
import { reviews } from "@/mocks/reviews.mocks";
import AuthorDetail from "@/components/instructor-detail.section";
import List from "@/components/list/list.component";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/icon.component";
import { Badge } from "@/components/ui/badge";
import { AppInclude } from './app-include.section';
import { Popover } from "@/components/popover/popover.component";
import { useApplicationData } from "./hooks/use-application-data.hook";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import AuthorInfo from "@/app/(site)/courses/components/detail/author-section";
import TempError from "@/components/temp-error/temp-error.component";

type Props = {
    children?: ReactNode
}

export const AppDetail: FC<Props> = () => {
    const { pageData, submitApplication } = useApplicationData();
    const [showGreeter, setShowGreeter] = useState(false);
    const searchParams = useSearchParams();
    const section = searchParams.get("section");
  console.log('pageData: ', pageData);

    const filters = [
        { label: "Funcionalidades", items: pageData?.functionalities || [] },
        { label: "Herramientas y plataformas", items: pageData?.toolsAndPlatforms || [] },
        { label: "Sector", items: pageData?.sector || [] },
        { label: "Tags", items: pageData?.tags || [] },
    ];

    return pageData && (
      <>
      { !section &&
        <BreadCrumb title={pageData.title} />
      }
        <div className="min-h-screen">
          <div className={`${!section ? "mt-8" : ""} mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14`}>
            <AppInfo {...pageData} submitApplication={submitApplication}>
              { pageData.author
                ? <AuthorInfo data={pageData.author}/>
                : <TempError>Lo sentimos, no podemos mostrar la información del autor ahora</TempError>
              }
              <ShareSection />
              <List
                header="Para quién es esta App"
                subheader="Esta App de AppSheet es para ti sí:"
                items={pageData.targetAudience}
              />
              <List
                header="Vistas de la App"
                subheader="Estás serán las pantallas (Vistas) a las que podrás acceder desde la app de facturas de AppSheet:"
                items={pageData.views}
              />
              <PageFilters filters={filters} />
              { section !== "preview" &&
                <ReviewsSection reviews={reviews} />
              }
            </AppInfo>
            <div className="space-y-6">
            { pageData.mobileLink &&
              <div className="flex flex-col items-center gap-6 mt-4">
                <Image
                  src={pageData.mobileLink}
                  alt=""
                  height={384}
                  width={192}
                  className="w-48 rounded-3xl h-96 border-8 border-[#374151]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D194E2] text-[#D194E2]"
                  onClick={() => setShowGreeter(true)}
                >
                  Ver en modo escritorio
                </Button>
              </div>
            }

              { pageData.author
                ? <AuthorDetail data={pageData.author} />
                : <TempError>Lo sentimos, no podemos mostrar la información del autor ahora</TempError>
              } 

              <Badge
                className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
                icon={<Icon name="powerapps" style="w-8 h-8" />}
              >
                {pageData?.platform}
              </Badge>

              <AppInclude
                title={pageData?.title}
                appIncludes={pageData?.appIncludes}
              />
              <Button 
                className={`w-full ${section === "preview" ? "bg-gray-400" : ""}`}
                disabled={section === "preview"}
              >
                Comprar curso
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={section === "preview"}
              >
                <Link href="/cart">
                  Añadir al carrito
                </Link>
              </Button>

            </div>
          </div>
          {showGreeter && (
            <Popover onClose={() => setShowGreeter(false)}>
              <Image
                className="w-full h-full rounded-lg"
                src={pageData.desktopLink}
                alt=""
                width={1920}
                height={1080}
              />
            </Popover>
          )}
        </div>
      </>
    );
};
