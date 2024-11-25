import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { ParentComponent } from "../_ components/detail/parent-course-detail.component";

const page = () => {

    return (
        <main>
            <BreadCrumb />

            <ParentComponent />
        </main>
    );

};

export default page;