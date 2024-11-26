import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { CourseDetail } from '../components/detail/course-detail.component';
import { FC } from "react";

const page: FC= () => {

    return (
        <main>
            <BreadCrumb />

            <CourseDetail/>
        </main>
    );

};

export default page;