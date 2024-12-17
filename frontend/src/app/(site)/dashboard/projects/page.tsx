import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Inter } from "next/font/google";
import ProjectCard from "./components/project-card.component";
import { projectsData } from "@/mocks/projects.mocks";
import Link from "next/link";
import NoData from "@/components/no-data/no-data.component";
import { ProjectWithFullImgs } from "@/types/project.types";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "400", "600", "700"],
    display: "swap",
});

const getProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_URL}`);
    const projects: ProjectWithFullImgs[] = await res.json();
    return projects
  } catch (err) {
    console.error("error when getting projects: ", err)
  }
};

const MyProjectsPage = async () => {
  const projectsData = await getProjects();

    // const activeProjects = projectsData.filter((project) => project.status === "En curso");
    // const completedProjects = projectsData.filter((project) => project.status === "Terminado");

    return (
        <main className={`${inter.className} w-full tracking-wide pb-28`}>
            <div className="px-6 md:px-0 mx-auto">
                <BreadCrumb />
            </div>
            <div className="flex flex-col gap-5">
                <div className="mt-14 flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
                    <h3 className="text-base font-bold">Mis proyectos</h3>
                    <div className="flex gap-5">

                        <Button variant={"outline"} className="sm:w-[250px] w-full text-primary-200 border-1 border-primary-200">
                            <Link href={"/projects"}>Explorar proyectos</Link>

                        </Button>
                        <Button className="sm:w-[250px] w-full">

                            <Link href={"projects/form?section=general"}>Publicar proyecto</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-14 md:gap-6">
          { projectsData ?
            <>
              <div className="flex flex-col gap-6 w-full xl:w-2/5">
                <Card className="p-3">
                  <h3 className="text-sm font-semibold">Proyectos Terminados</h3>
                </Card>
                <ul className="flex flex-col gap-6">
                  {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 xl:gap-6 w-full xl:w-3/5">
                <Card className="p-3">
                  <h3 className="text-sm font-semibold">Proyectos activos</h3>
                </Card>
                <ul className="flex flex-col gap-3 xl:gap-6">
                  {projectsData.map((project) => (
                    <ProjectCard key={project.id} project={project} active />
                  ))}
                </ul>
              </div>
            </> : <NoData entity="proyectos" />
          }
                </div>
            </div>
        </main>
    );
};

export default MyProjectsPage;
