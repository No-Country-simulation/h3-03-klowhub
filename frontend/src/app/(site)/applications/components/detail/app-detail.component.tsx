"use client"

import { useState } from "react";
import { AppInfo } from "./app-info.section";
import { ShareSection } from "@/app/(site)/courses/components/detail/share-section";
import PageFilters from "@/components/page-filters/page-filters.component";
import { ReviewsSection } from "@/app/(site)/courses/components/detail/reviews.section";
import { reviews } from "@/mocks/reviews.mocks";
import AuthorCard from "@/components/author-card/author-card.component";
import AuthorData from "@/components/author-card/components/author-data/author-data.component";
import List from "@/components/list/list.component";
import { Star, FileChartColumnIncreasing } from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon/icon.component";
import { Badge } from "@/components/ui/badge";
import { AppInclude } from './app-include.section';
import { Popover } from "@/components/popover/popover.component";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import AuthorInfo from "@/components/author-info/author-info";
import useStore from "@/contexts/store/use-store.hook";
import useApplicationContext from "@/app/(site)/dashboard/applications/components/application-form/hooks/use-application-context.hook";
import { breakApplication } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.acl";
import { ApplicationWithFullImgs } from "@/types/application.types";
import { BTUser } from "@/types/user.types";
import useIsClientCtx from "@/contexts/is-client/use-is-client.hook";

type Props = {
  serverSideData?: ApplicationWithFullImgs
}

export const AppDetail = ({ serverSideData }: Props) => {
  const isClientCtx = useIsClientCtx();
  const [showGreeter, setShowGreeter] = useState(false);
  const searchParams = useSearchParams();
  const section = searchParams.get("section");
  const [ user ] = useStore<BTUser>("user");

  const { state, submitApplication } = useApplicationContext();
  const clientSideData = state && isClientCtx && {...breakApplication(state, false), author: user};
  const pageData = clientSideData || serverSideData;
  if (!pageData) return <div>Cargando...</div>;

  const { 
    functionalities,
    toolsAndPlatforms,
    sector,
    tags,
    author,
    targetAudience,
    views,
    mobileLink,
    desktopLink,
    platform,
    title,
    appIncludes
  } = pageData;

  const filters = [
      { label: "Funcionalidades", items: functionalities || [] },
      { label: "Herramientas y plataformas", items: toolsAndPlatforms || [] },
      { label: "Sector", items: sector || [] },
      { label: "Tags", items: tags || [] },
  ];

  // console.log('author: ', author);
  // console.log('user: ', user);

  return pageData && (
    <>
    { !section &&
      <BreadCrumb title={pageData.title} />
    }
      <div className="min-h-screen">
        <div className={`${!section ? "mt-8" : ""} mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14`}>
          <AppInfo 
            {...pageData} 
            submitApplication={submitApplication}
            authorId={author?.id as string}
          >
            {/* this type error will be fixed when the hook returns always an app with its author */}
            { author &&
              <AuthorInfo data={author}/>
            }
            <ShareSection />
            <List
              header="Para quién es esta App"
              subheader="Esta App de AppSheet es para ti sí:"
              items={targetAudience}
            />
            <List
              header="Vistas de la App"
              subheader="Estás serán las pantallas (Vistas) a las que podrás acceder desde la app de facturas de AppSheet:"
              items={views}
            />
            <PageFilters filters={filters} />
            { section !== "preview" &&
              <ReviewsSection reviews={reviews} />
            }
          </AppInfo>
          <div className="space-y-6">
          { mobileLink &&
            <div className="flex flex-col items-center gap-6 mt-4">
              <Image
                src={mobileLink}
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

            { author &&
              <AuthorCard name={author.name} about={author.seller?.about || ""} profileImg={author.profileImg}> 
                <AuthorData Icon={Star} data={"Calificación del creador: 4.8"} />
                <AuthorData Icon={FileChartColumnIncreasing} data={"20 aplicaciones vendidas"}  />
              </AuthorCard>
            } 

            <Badge
              className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
              icon={<Icon name="powerapps" style="w-8 h-8" />}
            >
              {platform}
            </Badge>

            <AppInclude
              title={title}
              appIncludes={appIncludes}
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
              src={desktopLink}
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
