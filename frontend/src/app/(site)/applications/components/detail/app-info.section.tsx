import { FC, useState } from "react";
import { AppProps } from "./app-detail.types";
import { AppHeader } from "./app-detail-header.section";
import Greeter from "@/components/greeter/greeter.component";
import { updateSearchParams } from "@/utils/client.utils";
import { reactParserOptions } from "@/utils/component.utils";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { buttonVariants } from "@/components/ui/button";

export const AppInfo: FC<AppProps> = ({
  submitApplication,
  title, 
  shortDescription,
  fullDescription,
  rating,
  ratingCount, 
  coverImg,
  children,
  assets,
  authorId
}) => {

  const [ newApplicationId, setNewApplicationId ] = useState<string>()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get("section");
  const router = useRouter();

  const isExpanded = searchParams.get('isExpanded') === 'true';

  return ( 
    <div className="md:col-span-2 space-y-4">
      { newApplicationId &&
        <Greeter 
          header="¡Felicitaciones! Tu aplicación se publicó con éxito"
          message="Ya está disponible para que personas de todo el mundo la descubran y aprovechen."
        >
          <Button onClick={() => router.push(`/applications/${newApplicationId}`)}>Ir a la aplicación</Button>
          <Button>Volver a dashboard</Button>
        </Greeter>
      }
      <AppHeader
        title={title}
        shortDescription={shortDescription}
        rating={rating}
        ratingCount={ratingCount}
        assets={assets}
        coverImg={coverImg}
        authorId={authorId}
      />
      <div className="space-y-4" id='detail-container'>
        { children[0] }
        <h3 className="text-sm font-semibold">Acerca de esta app</h3>
        <div className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
          {fullDescription}
        </div>

        <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>
          <Button 
            className={`mt-3 px-20 ${section === "preview" ? "bg-gray-400" : ""}`}
            disabled={section === "preview"}
          >
            COMPRAR APP
          </Button>
          { children.slice(1) }
        </div>
      </div>
      <div className='w-full text-center'>
        <Link
          href={`${pathname}?${updateSearchParams("isExpanded", String(!isExpanded), searchParams)}#detail-container`}
          className={`text-purple-400 border-primary-300 px-16 mt-5 ${buttonVariants({ variant: "outline" })}`}
          scroll={!isExpanded ? false : true}
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </Link>
      </div>
      { section === "preview" &&
        <div className="w-full flex justify-between">
          <RouteBtn 
            route="promotion"
            className="mr-auto flex-1 md:grow-0"
          >
            Retroceder
          </RouteBtn>
          <Button 
            type="button"
            className="flex-1 md:grow-0"
            onClick={async () => {
              if (submitApplication) {
                const courseId = await submitApplication() 
                setNewApplicationId(courseId)
              };
            }}
          >
            Publicar
          </Button>
        </div>
      }
    </div>
  )
}
