import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ParentComponent } from "../_ components/detail/parent-course-detail.component";
import { FC } from "react";

interface PageProps {
    searchParams: { isExpanded?: string };
}

const page: FC<PageProps> = ({ searchParams }) => {

    const isExpanded = searchParams.isExpanded === "true";

    console.log(isExpanded);

    return (
        <main>
            <BreadCrumb />

            <ParentComponent isExpanded={isExpanded} />
        </main>
    );

};

export default page;