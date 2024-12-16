'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { CourseHeader } from './detail-header.section';
import { CourseProps } from '@/types/course-detail-props';
import { useSearchParams, usePathname } from 'next/navigation';
import RouteBtn from '@/components/route-btn/route-btn.component';
import { useRouter } from 'next/navigation';
import Greeter from "@/components/greeter/greeter.component";
import { updateSearchParams } from '@/utils/client.utils';
import { buttonVariants } from '@/components/ui/button';

export const CourseInfo: FC<CourseProps> = ({
  submitCourse,
    title,
    shortDescription,
    rating,
    ratingCount,
    freelessons, // comentar en caso de error
    fullDescription,
    children,
    promotionalVideo
}) => {
  const [ newCourseId, setNewCourseId ] = useState<string>()
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const section = searchParams.get("section");
  const router = useRouter();
  const isExpanded = searchParams.get('isExpanded') === 'true';

  return (
    <div className="md:col-span-2 space-y-4">
      { newCourseId &&
        <Greeter 
          header="¡Felicitaciones! Tu curso/Leccion se publicó con exito"
          message="Ya está disponible para que estudiantes de todo el mundo lo descubran y aprovechen."
        >
          <Button onClick={() => router.push(`/courses/${newCourseId}`)}>Ir al curso</Button>
          <Button>Volver a dashboard</Button>
        </Greeter>
      }
      <CourseHeader
        title={title}
        summarizeDescription={shortDescription}
        rating={rating}
        ratingCount={ratingCount}
        promotionalVideo={promotionalVideo}
        lessons={freelessons}
      />
      <div className="space-y-4" id='detail-container'>
        <h3 className="text-sm font-semibold">Acerca de este curso</h3>
        <div>
          <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
            {fullDescription}
          </p>
        </div>
        <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>
          { children[0] }
          { children[1] }
          <Button 
            className={`mt-3 px-20 ${section === "preview" ? "bg-gray-400" : ""}`}
            disabled={section === "preview"}
          >
            Añadir al Carrito
          </Button>

          {children.slice(2)}
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
              try {
                if (submitCourse) {
                  const courseId = await submitCourse() 
                  setNewCourseId(courseId)
                };
              } catch (err) {
                console.error("error when trying to get course data: ", err)
              }
            }}
          >
            Publicar
          </Button>
        </div>
      }
    </div>
  );

};
