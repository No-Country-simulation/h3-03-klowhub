import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { OwnedCourses } from "../components/owned-courses/owned-courses.component";

const endpoint = "http://localhost:3000/api/courses";

const getProducts = async (endpoint: string) => {
    const res = await fetch(endpoint, { cache: "force-cache" });
    const items = await res.json();
    return items
};

const page = async () => {

    const products = await getProducts(endpoint as string);

    return (
        <main>
            <BreadCrumb />

            <h3 className="text-sm font-semibold mt-8 mb-4">Mis Cursos</h3>

            <div>
                {products?.data.map((course: any, index: any) => (
                    <OwnedCourses data={course} key={index} />
                ))}
            </div>
        </main>
    );

};

export default page;