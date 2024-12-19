import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import OwnCoursesWrapper from "../components/owned-courses/own-courses-wrapper.component";

const page = async () => {
    return (
        <main>
            <BreadCrumb />
            <h3 className="text-sm font-semibold mt-8 mb-4">Mis Cursos</h3>
            <OwnCoursesWrapper />
        </main>
    );

};

export default page;
