"use client"

import { FC, ReactNode, useContext } from "react";
import { CourseInfo } from "./course-info.section";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SimilarCourses } from "./similar-courses.section";
//import useCourseContext from "@/app/dashboard/courses/new/hooks/use-course-context.hook";
import Link from "next/link";

import { reviews } from "@/mocks/reviews.mocks";
import { ReviewsSection } from "./reviews.section";
import { IncludeSection } from "./include-section";
import { RequirementsSection } from "./requirements-section";
import { AdditionalDetails } from "./additional-details.section";
import { ShareSection } from "./share-section";
// import { courseData } from "@/mocks/course-detail";
import { courseDataNew } from "@/mocks/course-detail";

import { InstructorDetail } from "./instructor-detail.section";
import { CourseProgramSection } from "./course-program.section";
import { CourseInfoSection } from "./info.section";
import { useSearchParams } from "next/navigation";
import useCourseContext from "@/app/dashboard/courses/new/hooks/use-course-context.hook";

import { CourseProps } from "@/types/course-detail-props";
import { CourseCtx } from "@/app/dashboard/courses/new/context/course-form.context";
import { transformCourse } from "@/utils/client.utils";

import { instructor } from "@/mocks/instructor.mock";
import { prepareCoursePreview } from "@/app/dashboard/courses/new/context/course-form.utils";

const transformedProgram = courseDataNew.modules.map((module) => ({
    moduleTitle: module.title,
    lessons: module.lessons.map((lesson) => lesson.title),
}));

const freeLessons = courseDataNew.modules.flatMap((module) =>
    module.lessons.filter((lesson) => lesson.free === true)
);

console.log(freeLessons);

type Props = {
    children?: ReactNode
}

export const CourseDetail: FC<Props> = ({ children }) => {


    const courseContext = useContext(CourseCtx);

    const searchParams = useSearchParams();

    const courseData = courseContext ? prepareCoursePreview(courseContext.state) : courseDataNew;

    return (
        <div className="min-h-screen space-y-10">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                <CourseInfo {...courseData} freelessons={freeLessons}>
                    <ShareSection />
                    <AdditionalDetails details={courseDataNew.additionalDetails} />
                    <RequirementsSection requirements={courseDataNew.prevRequirements} />
                    <IncludeSection />
                    <CourseInfoSection
                        coreContent={courseDataNew.coreContent}
                        sector={courseDataNew.sector}
                        toolsAndPlatforms={courseDataNew.toolsAndPlatform}
                        functionalities={courseDataNew.functionalities}
                    />
                    <ReviewsSection reviews={reviews} />
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
                        {courseDataNew.platform}
                    </Badge>

                    <CourseProgramSection program={transformedProgram} />

                    <Button className="w-full">Comprar curso</Button>
                    <Button variant="outline" className="w-full">
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
