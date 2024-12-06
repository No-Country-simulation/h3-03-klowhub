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

import { InstructorDetail } from "./instructor-detail.section";
import { CourseProgramSection } from "./course-program.section";
import { CourseInfoSection } from "./info.section";
import { useSearchParams } from "next/navigation";
import { instructorPitch } from "@/mocks/course-detail";


import { instructor } from "@/mocks/instructor.mock";
import { useCourseData } from "./hooks/use-course-data.hook";

type Props = {
    children?: ReactNode
}

export const CourseDetail: FC<Props> = ({ children }) => {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  const { pageData, submitCourse } = useCourseData();
  console.log('pageData: ', pageData);

    return pageData && (
        <div className="min-h-screen space-y-10">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                <CourseInfo {...pageData.courseData} freelessons={pageData.freeLessons} submitCourse={submitCourse}>
                    <ShareSection />
                    <GenericSection header={instructorPitch.title} text={instructorPitch.content} />
                    <GenericSection header="¿Para quién es este curso?" text={pageData.courseData.targetAudience} />
                    <RequirementsSection requirements={pageData.courseData.prevRequirements} />
                    <IncludeSection />
                    <CourseInfoSection
                        coreContent={pageData.courseData.coreContent}
                        sector={pageData.courseData.sector}
                        toolsAndPlatforms={pageData.courseData.toolsAndPlatforms}
                        functionalities={pageData.courseData.functionalities}
                    />
          { pageData.courseData.reviews &&
            <ReviewsSection reviews={pageData.courseData.reviews} />
          }
                </CourseInfo>

                <div className="space-y-6">
                    <InstructorDetail
                        name={instructor.name}
                        description={instructor.description}
                        image={instructor.image}
                        rating={instructor.rating}
                        students={instructor.students}
                        courses={instructor.courses}
                        profileLink={instructor.profileLink}
                    />

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
    );
}
