"use client"

import AuthorData from "@/components/author-card/components/author-data/author-data.component";
import { Star, User, BookOpen } from "lucide-react";
import { FC, ReactNode } from "react";
import { CourseInfo } from "./course-info.section";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { ReviewsSection } from "./reviews.section";
import { RequirementsSection } from "./requirements-section";
import { GenericSection } from "./generic-section.section";
import { ShareSection } from "./share-section";

import AuthorCard from "../../../../../components/author-card/author-card.component";
import { CourseProgramSection } from "./course-program.section";
import PageFilters from "@/components/page-filters/page-filters.component";
import { useSearchParams } from "next/navigation";
import { instructorPitch } from "@/mocks/course-detail";

import { useCourseData } from "./hooks/use-course-data.hook";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { IncludeSection } from "./include-section";
import TempError from "@/components/temp-error/temp-error.component";
import AuthorInfo from "../../../../../components/author-info/author-info";
import { ObjectivesList } from "./objectives.section";

type Props = {
  children?: ReactNode
}

export const CourseDetail: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const { pageData, submitCourse } = useCourseData();
  if (!pageData) return <div>Cargando...</div>;

  const { 
    courseData: { 
      coreContent,
      functionalities,
      toolsAndPlatforms,
      sector,
      tags,
      author,
      targetAudience,
      prevRequirements,
      platform,
      learningSubjects,
    },
    freeLessons,
    transformedProgram
  } = pageData;

  const filters = [
    { label: "Pilar de contenido", items: coreContent || [] },
    { label: "Funcionalidades", items: functionalities || [] },
    { label: "Herramientas y plataformas", items: toolsAndPlatforms || [] },
    { label: "Sector", items: sector || [] },
    { label: "Tags", items: tags || [] },
  ];

  return pageData && (
    <>
      { !section &&
        <BreadCrumb title={pageData.courseData.title}/>
      }
      <div className="min-h-screen space-y-10">
        <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
          <CourseInfo {...pageData.courseData} freelessons={freeLessons} submitCourse={submitCourse}>
            {/* { author */}
            {/*   ? <AuthorInfo data={author} /> */}
            {/*   : <TempError element="author section" reason="la api no esta enviando info del autor"/> */}
            {/* } */}
            <ObjectivesList 
              header="Después de completar este curso, serás capaz de"
              objectives={learningSubjects} 
            />
            <ShareSection />
            <GenericSection header={instructorPitch.title} text={instructorPitch.content} />
            <GenericSection header="¿Para quién es este curso?" text={targetAudience} />
            <RequirementsSection requirements={prevRequirements} />

            <IncludeSection data={pageData.courseData.courseIncludes}/>

            <PageFilters filters={filters} />
            {pageData.courseData.reviews &&
              <ReviewsSection reviews={pageData.courseData.reviews} />
            }
          </CourseInfo>

          <div className="space-y-6">
            { author
              ? (
                <AuthorCard name={author.name} about={author.about} profileImg={author.profileImg}> 
                  <AuthorData Icon={Star} data={"Calificación del instructor: 4.5"} />
                  <AuthorData Icon={User} data={"12 Estudiantes"}  />
                  <AuthorData Icon={BookOpen} data={"5 Cursos"}  />
                </AuthorCard>
              )
              : (
                <TempError element="author section" reason="la api no esta enviando info del autor"/>
              )
            }

            <Badge
              className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
              icon={<Icon name="powerapps" style="w-8 h-8" />}
            >
              {platform}
            </Badge>

            <CourseProgramSection program={transformedProgram} />

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
