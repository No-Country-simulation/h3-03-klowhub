"use client"

import { useCourseData } from "@/app/(site)/courses/components/detail/hooks/use-course-data.hook";
import { CourseViewer } from "./course-viewer.section";


const Course = () => {

    const { pageData } = useCourseData();

    if (!pageData || !pageData.courseData) {
        return <p>Loading...</p>;
    }

    const modules = pageData.courseData.modules.map((module: any) => ({
        title: module.title,
        description: module.description,
        lessons: module.lessons.map((lesson: any) => ({
            id: lesson.id,
            title: lesson.title,
            freeLesson: lesson.freeLesson,
            link: lesson.link,
        })),
    }));

    return pageData && (
        <section className="mt-8">
            <CourseViewer modules={modules} />
        </section>
    );

};

export default Course;