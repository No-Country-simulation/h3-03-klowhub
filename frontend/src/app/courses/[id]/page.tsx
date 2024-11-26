import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { CourseDetail } from '../components/detail/course-detail.component';
import { FC } from "react";

interface PageProps {
    searchParams: { isExpanded?: string };
    params: { id: string }
}

const page: FC<PageProps> = ({ searchParams, params }) => {

    const isExpanded = searchParams.isExpanded === "true";

    return (
        <main>
            <BreadCrumb />

            <CourseDetail isExpanded={isExpanded} pathname={`/courses/${params.id}`}/>
        </main>
    );

};

export default page;