import CourseCard from "@/components/course-card/course-card.component";
import SoldCoursesTable from "@/components/sold-courses-table/sold-courses-table";
import TabLinks from "@/components/tab-links/tab-links.component";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarSearch, ListOrdered, Shovel } from "lucide-react";
import Image from "next/image";

const MyCoursesDesktopView = () => {
    return (
        <Card className="hidden lg:flex py-5 mx-auto">
            <CardContent className="flex flex-col gap-14">
                <div className="flex justify-between xl:w-2/3 w-full">
                    <TabLinks />
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#D194E2] bg-transparent text-[#D194E2]"
                        >
                            <CalendarSearch />
                            <span className="hidden md:block">Filtrar por fecha</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-[#D194E2] bg-transparent text-[#D194E2]"
                        >
                            <ListOrdered />
                            <span className="hidden md:block">Ordenar por</span>
                        </Button>
                    </div>
                </div>
                <div className="px-5 flex gap-5 xl:flex-row flex-col">
                    <SoldCoursesTable />
                    <div className="xl:w-1/4 w-full p-5 flex bg-white/10 justify-center items-center relative">
                        <Image
                            alt="some description"
                            width={200}
                            height={200}
                            src={"https://res.cloudinary.com/dpp28f2ek/image/upload/v1732045469/chart_nfplid.png"}
                        />

                        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-2">
                            <Shovel className="text-white w-8 h-8" />
                            <span className="text-white text-lg font-bold">En construcción</span>
                        </div>
                    </div>
                </div>
                <div className="px-5 flex flex-col gap-5">
                    <span className="text-base font-bold">Cursos creados</span>
                    <div className="grid grid-cols-1 gap-5
                                            md:grid-cols-2 md:px-0
                                            lg:grid-cols-2
                                            xl:grid-cols-3">
                        <CourseCard />
                        <CourseCard />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default MyCoursesDesktopView