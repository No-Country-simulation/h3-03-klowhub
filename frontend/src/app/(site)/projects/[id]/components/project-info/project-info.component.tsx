"use client"

import { ReactNode } from "react";
import Tab from "@/components/tab/tab.component";
import useProjectContext from "../../../../dashboard/projects/components/project-form/hooks/use-project-context.hook";
import FilterDisplayer from "@/components/filter-displayer/filter-displayer.component";
import { useState } from "react";
import RouteBtn from "@/components/route-btn/route-btn.component";
import { Button } from "@/components/ui/button";
import Greeter from "@/components/greeter/greeter.component";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import UploadedImage from "@/components/uploaded-image/uploaded-image.component";
import FileBadge from "@/components/file-badge/file-badge.component";
import UploadedVideo from "@/components/uploaded-video/uploaded-video.component";
import { ProjectWithFullImgs } from "@/types/project.types";
import useProjectData from "../../use-application-data.hook";

type Props = {
  serverSideData?: ProjectWithFullImgs
}

const tabs = [ "Información", "Recursos" ];

const ProjectInfo = ({ serverSideData }: Props) => {
  const [ newProjectId, setNewProjectId ] = useState<string>()
  const [ error, setError ] = useState<object | null>(null)
  const [ activeTab, setActiveTab ] = useState(0)

  const { state: clientSideData, submitProject } = useProjectContext();

  const dataSources = { serverSideData, clientSideData };
  const pageData = useProjectData(dataSources);
  console.log('pageData: ', pageData);

  if (!pageData) return <div>Cargando...</div>;

  const {
    title,
    description,
    days,
    minBudget,
    maxBudget,
    technicalRequirements,
    experienceLevel,
    sector,
    tags,
    requiredSkills,
    additionalRequirements
  } = pageData;

  const images = pageData.assets.filter(ast => ast.fileType === "image")
  const videos = pageData.assets.filter(ast => ast.fileType === "video")
  const documents = pageData.assets.filter(ast => ast.fileType === "document");

  console.log('sector: ', sector);
  return (
    <>
      {/* { error &&  */}
      {/*   <Popover onClose={() => setError(null)}> */}
      {/*     {error.message.map((err, idx) => ( */}
      {/*       <span key={`error-${idx}`}>{err}</span> */}
      {/*     ))} */}
      {/*   </Popover> */}
      {/* } */}
      { newProjectId &&
        <Greeter
          header="¡Proyecto publicado!"
          message="El servicio ha sido contratado exitosamente. Pronto nos pondremos en contacto contigo para iniciar el proyecto y coordinar los siguientes pasos."
        >
          <Link
            href={`/dashboard/projects`}
            className={`${buttonVariants({ variant: "outline" })} px-10 bg-primary-500 border-none hover:bg-secondary-400`}
          >
            Volver al menú
          </Link>
        </Greeter>
      }
      <div className="mb-5">
        { 
          tabs.map((t, idx) => (
          <button onClick={ () => setActiveTab(idx) } key={`tab-${idx}`}>
            <Tab active={activeTab === idx}>{t}</Tab>
          </button>
          ))
        }
      </div>
      { activeTab === 0 &&
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-bold">{ title }</h3>
            <p className="mt-5">{ description }</p>
          </div>
          <div>
            <h3 className="font-bold">Requisitos técnicos</h3>
            <ul className="list-disc mt-5 ml-5">{
              technicalRequirements.map((t, idx) => (
                <li key={`technical-requirement-${idx}`}>{t}</li>
              ))
            }</ul>
          </div>
          <div>
            <h3 className="font-bold">Cantidad de días del proyecto</h3>
            <p className="mt-5">{ days } días</p>
          </div>
          <div>
            <h3 className="font-bold">Presupuesto del proyecto</h3>
            <p className="mt-5">USD { minBudget } - { maxBudget }</p>
          </div>
          <div className={`
          flex flex-col gap-10 items-start
          md:flex-row
          `}>
            <FilterDisplayer header="Nivel de experiencia" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
              <PreviewFilter>
                {experienceLevel}
              </PreviewFilter>
            </FilterDisplayer>
            <FilterDisplayer header="Habilidades necesarias" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
              {requiredSkills.map((sk, idx) => (
                <PreviewFilter key={`required-skill-${idx}`}>{sk}</PreviewFilter>
              ))}
            </FilterDisplayer>
            <FilterDisplayer header="Sector" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
              {sector.map((s, idx) => (
                <PreviewFilter key={`sector-${idx}`}>{s}</PreviewFilter>
              ))}
            </FilterDisplayer>
            <FilterDisplayer header="Tags" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
              {tags.map((t, idx) => (
                <PreviewFilter key={`tag-${idx}`}>{t}</PreviewFilter>
              ))}
            </FilterDisplayer>
          </div>
          <div>
            <h3 className="font-bold">Requisitos adicionales</h3>
            <ul className="list-disc mt-5 ml-5">{
              additionalRequirements.map((t, idx) => (
                <li key={`additional-requirement-${idx}`}>{t}</li>
              ))
            }</ul>
          </div>
        </div>
      }
      { activeTab === 1 &&
        <div className="space-y-5">
          <h3 className="font-bold">Recursos</h3>
          <div className={`
            grid grid-cols-2 gap-2
            sm:grid-cols-2 sm:gap-5
            md:grid-cols-3
          `}>
            {
              images.map((ast, idx) => <UploadedImage src={ast.fileMetadata.url} key={`image-${idx}`} readOnly />)
            }
          </div>
          <div className={`
            grid grid-cols-1 gap-5
            sm:grid-cols-2
            md:grid-cols-3
          `}>
            {
              videos.map((ast, idx) => <UploadedVideo video={ast} key={`image-${idx}`} />)
            }
          </div>
          <div className="flex flex-col items-start gap-5">
            {
              documents.map((doc, idx) => (
                <FileBadge data={doc} key={`document-${idx}`} />
              ))
            }
          </div>
        </div>
      }
      { submitProject &&
        <div className="absolute w-full bottom-0 -mb-16 -ml-6 flex justify-between pt-5">
          <RouteBtn route="details">Regresar</RouteBtn>
          <Button 
            type="button"
            className="flex-1 md:grow-0"
            onClick={async () => {
              try {
                const projectId = await submitProject() 
                setNewProjectId(projectId)
              } catch (err) {
                setError(err as Error)
              }
            }}
          >
            Publicar
          </Button>
        </div>
      }
    </>
  )   
};

const PreviewFilter = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <span className="bg-white text-card py-1 px-3 rounded-md flex">
      {children}
    </span>
  )
};

export default ProjectInfo
