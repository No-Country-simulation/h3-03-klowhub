import { FC } from "react";
import { CourseInfo } from "./course-info.section";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import { SimilarCourses } from "./similar-courses.section";

import { courseData } from "@/mocks/course-detail";
import { InstructorDetail } from "./instructor-detail.section";
import { CourseProgramSection } from "./course-program.section";

const transformedProgram = courseData.modules.map((module) => ({
    moduleTitle: module.title,
    lessons: module.lessons.map((lesson) => lesson.title),
}));


export const CourseDetail: FC = () => {
    return (
        <div className="min-h-screen space-y-10">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                <CourseInfo {...courseData}/>
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
                        icon={<Icon name="power-apps" style="w-8 h-8" />}
                    >
                        AppSheet
                    </Badge>

                    <CourseProgramSection program={transformedProgram} />

                    <Button className="w-full">Comprar curso</Button>
                    <Button variant="outline" className="w-full">Añadir al carrito</Button>
                </div>
            </div>
            <SimilarCourses />
        </div>
    );
}
