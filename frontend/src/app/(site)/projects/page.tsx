import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import { IsClientProvider } from "@/contexts/is-client/is-client.context";
import { sector, platform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";
import ProjectCard from "./components/project-card.component";
import Pager from "@/components/pager/pager.component";
import NoData from "@/components/no-data/no-data.component";
import { transformBTProject } from "./projects-page.acl";

import { ProjectWithFullImgs } from "@/types/project.types";
import { RequiredProperty } from "@/types/utils.types";

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
    const projects: RequiredProperty<ProjectWithFullImgs>[] = await res.json();
    const transformedProjects = projects.map(p => transformBTProject(p));

    return transformedProjects
  } catch (err) {
    console.error("error requesting projects: ", err)
  }
};

const ProjectsPage = async () => {
  const projectsData = await getProjects();

  return ( 
    <main className="w-full tracking-wide pb-28">
      <div className="px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <IsClientProvider>
        <SearchFilter filters={filters} />
      </IsClientProvider>

      <div className="md:-translate-y-16 -translate-y-24">

        <ul className="flex flex-col gap-5 mb-6">
          {
            projectsData && projectsData.length
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
