"use client"

import { FC, ReactNode } from "react";
import { CourseInfo } from "./course-info.section";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// import { reviews } from "@/mocks/reviews.mocks";
import { ReviewsSection } from "./reviews.section";
import { IncludeSection } from "./include-section";
import { RequirementsSection } from "./requirements-section";
import { GenericSection } from "./generic-section.section";
import { ShareSection } from "./share-section";

import AuthorDetail from "../../../../../components/instructor-detail.section";
import { CourseProgramSection } from "./course-program.section";
import PageFilters from "@/components/page-filters/page-filters.component";
import { useSearchParams } from "next/navigation";
import { instructorPitch } from "@/mocks/course-detail";


import { useCourseData } from "./hooks/use-course-data.hook";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import TempError from "@/components/temp-error/temp-error.component";
import AuthorInfo from "./author-section";
import { ObjectivesList } from "./objectives.section";

type Props = {
  children?: ReactNode
}

export const CourseDetail: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const { pageData, submitCourse } = useCourseData();

  const filters = [
    { label: "Pilar de contenido", items: pageData?.courseData.coreContent || [] },
    { label: "Funcionalidades", items: pageData?.courseData.functionalities || [] },
    { label: "Herramientas y plataformas", items: pageData?.courseData.toolsAndPlatforms || [] },
    { label: "Sector", items: pageData?.courseData.sector || [] },
    { label: "Tags", items: pageData?.courseData.tags || [] },
  ];

  return pageData && (
    <>
      { !section &&
        <BreadCrumb title={pageData.courseData.title}/>
      }
      <div className="min-h-screen space-y-10">
        <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
          <CourseInfo {...pageData.courseData} freelessons={pageData.freeLessons} submitCourse={submitCourse}>
            { pageData.courseData.author
              ? <AuthorInfo data={pageData.courseData.author} />
              : <TempError element="author section" reason="la api no esta enviando info del autor"/>
            }
            <ObjectivesList 
              header="Después de completar este curso, serás capaz de"
              objectives={pageData.courseData.learningSubjects} 
            />
            <ShareSection />
            <GenericSection header={instructorPitch.title} text={instructorPitch.content} />
            <GenericSection header="¿Para quién es este curso?" text={pageData.courseData.targetAudience} />
            <RequirementsSection requirements={pageData.courseData.prevRequirements} />
            <TempError element="seccion 'incluye'" reason="es una nueva key, por lo que el backend aún no la esta enviando"  />
            {/* <IncludeSection data={pageData.courseData.courseIncludes}/> */}
            <PageFilters filters={filters} />
            {pageData.courseData.reviews &&
              <ReviewsSection reviews={pageData.courseData.reviews} />
            }
          </CourseInfo>

          <div className="space-y-6">
            { pageData.courseData.author
              ? <AuthorDetail data={pageData.courseData.author } />
              : <TempError element="author section" reason="la api no esta enviando info del autor"/>
            }

            <Badge
              className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
              icon={<Icon name="powerapps" style="w-8 h-8" />}
            >
              {pageData.courseData.platform}
            </Badge>

            <CourseProgramSection program={pageData.transformedProgram} />

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
        {children}
      </div>
    </>
  );
}
