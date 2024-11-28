"use client"

import { FC, ReactNode, useContext } from "react";
import { CourseInfo } from "./course-info.section";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SimilarCourses } from "./similar-courses.section";
import useCourseContext from "@/app/dashboard/courses/new/hooks/use-course-context.hook";

import { reviews } from "@/mocks/reviews.mocks";
import { ReviewsSection } from "./reviews.section";
import { IncludeSection } from "./include-section";
import { RequirementsSection } from "./requirements-section";
import { AdditionalDetails } from "./additional-details.section";
import { ShareSection } from "./share-section";
import { courseData } from "@/mocks/course-detail";

import { InstructorDetail } from "./instructor-detail.section";
import { CourseProgramSection } from "./course-program.section";
import { CourseInfoSection } from "./info.section";
import { useSearchParams } from "next/navigation";

import { CourseProps } from "@/types/course-detail-props";
import { CourseCtx } from "@/app/dashboard/courses/new/context/course-form.context";
import { transformCourse } from "@/utils/client.utils";


type Props = {
  children?: ReactNode
}

export const CourseDetail: FC<Props> = ({ children }) => {
  // const searchParams = useSearchParams();
    const { state, dispatch } = useContext(CourseCtx);

    const source = state ? transformCourse(state) : courseData;
  // const source = courseData;

const transformedProgram = source.modules.map((module) => ({
    moduleTitle: module.title,
    lessons: module.lessons.map((lesson) => lesson.title),
}));

    return (
        <div className="min-h-screen space-y-10">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                <CourseInfo
          details={{
            title: source.details.title,
            description: source.details.description,
            rating: 0,
            ratingCount: 0,
            image: source.details.image,
          }}
          lessons={source.lessons}
          instructor={source.instructor}
          objectives={source.objectives}
          about={source.about}
        >
                  <ShareSection />
                  <AdditionalDetails details={courseData.additionalDetails} />
                  <RequirementsSection requirements={courseData.requirements} />
                  <IncludeSection />
                  <CourseInfoSection sections={courseData.appInfoSections.sections} />
                  <ReviewsSection reviews={reviews} />
                </CourseInfo>

                <div className="space-y-6">
                    <InstructorDetail
                        name={courseData.instructor.name}
                        description="Instructor y desarrollador"
                        image={courseData.instructor.image}
                        rating={4.3}
                        students={43830}
                        courses={77}
                        profileLink={courseData.instructor.profileLink}
                    />

                    <Badge
                        className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
                        icon={<Icon name="powerapps" style="w-8 h-8" />}
                    >
                        AppSheet
                    </Badge>

                    <CourseProgramSection program={transformedProgram} />

                    <Button className="w-full">Comprar curso</Button>
                    <Button variant="outline" className="w-full">Añadir al carrito</Button>
                </div>
            </div>
      { children }
        </div>
    );
}
