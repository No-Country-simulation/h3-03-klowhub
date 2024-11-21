import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component"
import MyCoursesDesktopView from "@/components/my-courses/my-courses-desktop.component";
import MyCoursesMobileView from "@/components/my-courses/my-courses-mobile.component";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

const MyCoursesPage = () => {
    return (
        <main className={`${inter.className} w-full tracking-wide pb-28`}>
            <div className="px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>
            <div className="flex flex-col gap-5">
                <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-base font-bold">Mis cursos</h3>
                    <Button className="sm:w-[250px] w-full">Crear curso</Button>
                </div>
                <MyCoursesDesktopView />
                <MyCoursesMobileView />
            </div>
        </main>
    )
}

export default MyCoursesPage