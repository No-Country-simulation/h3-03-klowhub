import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import { Inter } from "next/font/google";
import { sector, platform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import ProjectCard from "./components/project-card.component";
// import { projectsData } from "@/mocks/projects.mocks";
import Pager from "@/components/pager/pager.component";
import { ProjectWithFullImgs } from "@/types/project.types";
import NoData from "@/components/no-data/no-data.component";

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

const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_URL}`);   
    const projects: ProjectWithFullImgs[] = await res.json();
    return projects
  } catch (err) {
    console.error("error requesting projects: ", err)
  }
};

const ProjectsPage = async () => {
  const projectsData = await getProjects();

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
                    {
            projectsData 
            ? projectsData.map((project) => <ProjectCard key={project.id} project={project} />)
            : <NoData entity="proyectos" />
          }
                </ul>

                <Pager />

            </div>
        </main>
    );
};

export default ProjectsPage;
