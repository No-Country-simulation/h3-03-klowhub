import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import ProjectInfo from "./components/project-info/project-info.component";
import AuthorCard from "@/components/author-card/author-card.component";
import AuthorData from "@/components/author-card/components/author-data/author-data.component";
import { FileChartColumnIncreasing, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectWithFullImgs } from "@/types/project.types";
import ProposalFormWithKanbanContext from "./components/proposal-form/proposal-form-with-kanban-context";

const endpoint = process.env.NEXT_PUBLIC_PROJECTS_URL;

const getProject = async (projectId: string) => {
  const res = await fetch(`${endpoint}/${projectId}?withAuthor=true`);
  const projectData: ProjectWithFullImgs = await res.json();
  console.log('projectData: ', projectData);

  return projectData
};

type Props = {
  params: Promise<{
    id: string
  }>
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const projectData = await getProject(id);

  return (
    <main className="pb-6">
      <BreadCrumb />
      <div className={`
        flex flex-col bg-card rounded-lg p-6 gap-10 flex-wrap
        lg:flex-row lg:gap-0
      `}>
        <div className={`
          w-full pr-0
          lg:w-3/4 lg:pr-20 lg:pb-5
        `}>
          <ProjectInfo serverSideData={projectData} />
        </div>
        <div className={`
          w-full
          lg:w-1/4
        `}>
          <AuthorCard
            name={projectData.author.name}
            about={projectData.author.seller!.about}
            profileImg={projectData.author.profileImg}
          >
            <AuthorData Icon={Star} data="Calificación: 5" />
            <AuthorData Icon={MessageSquare} data="42 Reseñas" />
            <AuthorData Icon={FileChartColumnIncreasing} data="60 proyectos creados" />
          </AuthorCard>
        </div>
        <div className={`
          w-full pt-5 border-t-1 
          lg:w-full 
        `}>
          {/* <ProposalForm /> */}
          <ProposalFormWithKanbanContext author={projectData.author} title={projectData.title} />
        </div>
      </div>
      <div className="w-full flex justify-end pt-5">
        <Button type="submit" form="proposal-form">Enviar propuesta</Button>
      </div>
    </main>
  )
};

export default ProjectDetailPage
