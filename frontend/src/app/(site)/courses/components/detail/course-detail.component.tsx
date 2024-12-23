"use client"

import AuthorData from "@/components/author-card/components/author-data/author-data.component";
import { Star, User, BookOpen } from "lucide-react";
import { ReactNode } from "react";
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

import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { IncludeSection } from "./include-section";
import AuthorInfo from "../../../../../components/author-info/author-info";
import { ObjectivesList } from "./objectives.section";
import { CourseWithFullAssets } from "@/types/courses.types";
import useCourseContext from "@/app/(site)/dashboard/courses/components/course-form/hooks/use-course-context.hook";
import { reviews } from "@/mocks/reviews.mocks";
import useCourseData from "../../[id]/use-course-data.hook";

type Props = {
  serverSideData?: CourseWithFullAssets
  children?: ReactNode
}

export const CourseDetail = ({ serverSideData, children }: Props) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const { state: clientSideData, submitCourse } = useCourseContext();

  const dataSources = { serverSideData, clientSideData };
  const pageData = useCourseData(dataSources);
  if (!pageData) return <div>Cargando...</div>;


  const { 
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
    modules
  } = pageData;
  console.log('pageData: ', pageData);

  const lessons = modules.map(m => m.lessons).flat();
  const freeLessons = lessons.filter(l => l.freeLesson);
  const modulesForDisplay = modules.map(m => ({ title: m.title, lessons: m.lessons }));

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
        <BreadCrumb title={pageData.title}/>
      }
      <div className="min-h-screen space-y-10">
        <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
          <CourseInfo 
            {...pageData} 
            freelessons={freeLessons} 
            submitCourse={submitCourse}
            authorId={author?.id as string}
          >
            { author &&
              <AuthorInfo data={author} />
            }
            <ObjectivesList 
              header="Después de completar este curso, serás capaz de"
              objectives={learningSubjects} 
            />
            <ShareSection />
            <GenericSection header={instructorPitch.title} text={instructorPitch.content} />
            <GenericSection header="¿Para quién es este curso?" text={targetAudience} />
            <RequirementsSection requirements={prevRequirements} />

            <IncludeSection data={pageData.courseIncludes}/>

            <PageFilters filters={filters} />
            { section !== "preview" &&
              <ReviewsSection reviews={reviews} />
            }
          </CourseInfo>

          <div className="space-y-6">
            { author && 
              <AuthorCard name={author.name} about={author.seller?.about || ""} profileImg={author.profileImg}> 
                <AuthorData Icon={Star} data={"Calificación del instructor: 4.5"} />
                <AuthorData Icon={User} data={"12 Estudiantes"}  />
                <AuthorData Icon={BookOpen} data={"5 Cursos"}  />
              </AuthorCard>
            }

            <Badge
              className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
              icon={<Icon name="powerapps" style="w-8 h-8" />}
            >
              {platform}
            </Badge>

            <CourseProgramSection modules={modulesForDisplay} />

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
