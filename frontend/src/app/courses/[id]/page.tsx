import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { CourseDetail } from '../components/detail/course-detail.component';
import { FC } from "react";
import { SimilarCourses } from "../components/detail/similar-courses.section";

const page: FC= () => {

    return (
        <main>
            <BreadCrumb/>

            <CourseDetail>
              <SimilarCourses />
            </CourseDetail>
        </main>
    );

};

export default page;
