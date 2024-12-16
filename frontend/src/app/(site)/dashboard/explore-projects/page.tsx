import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import { IsClientProvider } from "@/contexts/is-client.context";
import { Inter } from "next/font/google";
import { sector, platform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import ProjectCard from "./components/project-card.component";
import { projectsData } from "@/mocks/projects.mocks";
import Pager from "@/components/pager/pager.component";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

const filters = [
    platform,
    language,
    sector,
    functionalities,
    toolsAndPlatforms
];

const ProjectsPage = () => {

    return (
        <main className={`${inter.className} w-full tracking-wide pb-28`}>
            <div className="px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>

            <IsClientProvider>
                <SearchFilter filters={filters} />
            </IsClientProvider>

            <div className="md:-translate-y-16 -translate-y-24">

                <ul className="flex flex-col gap-5 mb-6">
                    {projectsData.map((project) => <ProjectCard key={project.id} project={project} />)}
                </ul>

                <Pager />

            </div>
        </main>
    );
};

export default ProjectsPage;