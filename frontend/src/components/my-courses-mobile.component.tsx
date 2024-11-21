import { CalendarSearch, ListFilter, ListOrdered } from "lucide-react"
import { Button } from "../ui/button"
import SoldCoursesTable from "../sold-courses-table/sold-courses-table"
import TabLinks from "../tab-links/tab-links.component"

const MyCoursesMobileView = () => {
    return (
        <div className="lg:hidden flex flex-col w-full gap-5">
            <div className="flex gap-4 w-full">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit border-[#D194E2] bg-transparent text-[#D194E2]"
                >
                    <ListFilter />
                    <span className="block">Filtros</span>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-fit border-[#D194E2] bg-transparent text-[#D194E2]"
                >
                    <ListOrdered />
                    <span className="block">Ordenar por</span>
                </Button>
            </div>
            <TabLinks />
            <SoldCoursesTable />
        </div>
    )
}

export default MyCoursesMobileView