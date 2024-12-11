import { FC, useState } from "react";
import { AppProps } from "./app-detail.types";
import { AppHeader } from "./app-detail-header.section";
import { instructor } from "@/mocks/instructor.mock";
import { InstructorInfo } from "@/app/courses/components/detail/instructor-section";
import Greeter from "@/components/greeter/greeter.component";
import { updateSearchParams } from "@/utils/client.utils";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import RouteBtn from "@/components/route-btn/route-btn.component";

const options = {
    replace(domNode: DOMNode) {
      if (!(domNode instanceof Element)) return domNode;

      if (domNode.tagName === "ol") {
        return (
          <ol {...attributesToProps(domNode.attribs)} className="list-disc text-sm flex flex-col gap-1">
            {domToReact(domNode.children as DOMNode[], options)}
          </ol>
        );
      }
      if (domNode.tagName === "li") {
        return (
          <li {...attributesToProps(domNode.attribs)} className="ml-8 pl-2">
            {domToReact(domNode.children as DOMNode[], options)}
          </li>
        );
      }
    },
  };

export const AppInfo: FC<AppProps> = ({
  submitApplication,
    title, 
    shortDescription,
    fullDescription,
    rating,
    ratingCount, 
    coverImg,
    children,
  assets
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
            />
            <div className="space-y-4" id='detail-container'>
                <InstructorInfo instructor={instructor}/>
                <h3 className="text-sm font-semibold">Acerca de esta app</h3>
                <div className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        {parse(fullDescription, options)}
                    {/* <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}> */}
                    {/* </p> */}
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button 
            className={`mt-3 px-20 ${section === "preview" ? "bg-gray-400" : ""}`}
            disabled={section === "preview"}
          >COMPRAR APP</Button>

                    {children}

                </div>
            </div>
            <div className='w-full text-center'>
                <Link
                    href={`${pathname}?${updateSearchParams("isExpanded", String(!isExpanded), searchParams)}#detail-container`}
                    className="text-purple-400"
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
