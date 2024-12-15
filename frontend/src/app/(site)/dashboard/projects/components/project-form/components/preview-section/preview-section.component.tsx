"use client"

import { ReactNode } from "react";
import { TVideo } from "@/types/global.types";
import useProjectContext from "../../hooks/use-project-context.hook";
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
import { Popover } from "@/components/popover/popover.component";

const ProjectPreviewSection = () => {
  const { state, submitProject } = useProjectContext();
  const [ newProjectId, setNewProjectId ] = useState<string>()
  const [ error, setError ] = useState<object | null>(null)

  const graphicalAssets = state.details.assets.filter(ast => ["image", "video"].includes(ast.fileType))
  const documents = state.details.assets.filter(ast => ast.fileType === "document");

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
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="font-bold">{ state.general.title }</h3>
          <p className="mt-5">{ state.general.description }</p>
        </div>
        <div>
          <h3 className="font-bold">Requisitos técnicos</h3>
          <ul className="list-disc mt-5 ml-5">{
            state.details.technicalRequirements.map((t, idx) => (
              <li key={`technical-requirement-${idx}`}>{t}</li>
            ))
          }</ul>
        </div>
        <div>
          <h3 className="font-bold">Cantidad de días del proyecto</h3>
          <p className="mt-5">{ state.details.days } días</p>
        </div>
        <div>
          <h3 className="font-bold">Presupuesto del proyecto</h3>
          <p className="mt-5">USD { state.details.minBudget } - { state.details.maxBudget }</p>
        </div>
        <div className="flex gap-10">
          <FilterDisplayer header="Nivel de experiencia" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
            <PreviewFilter>
              {state.general.experienceLevel?.label}
            </PreviewFilter>
          </FilterDisplayer>
          <FilterDisplayer header="Habilidades necesarias" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
            {state.details.requiredSkills.map((sk, idx) => (
              <PreviewFilter key={`required-skill-${idx}`}>{sk.label}</PreviewFilter>
            ))}
          </FilterDisplayer>
          <FilterDisplayer header="Sector" orientation="horizontal" containerStyles="border-1 py-2 px-5 rounded-lg border-primary-300">
            {state.general.sector.map((s, idx) => (
              <PreviewFilter key={`sector-${idx}`}>{s.label}</PreviewFilter>
            ))}
          </FilterDisplayer>
        </div>
        <div className="space-y-5">
          <h3 className="font-bold">Recursos</h3>
          <div className="grid grid-cols-3 gap-5">
            {
              graphicalAssets.map((ast, idx) => {
                if (ast.fileType === "image") 
                  return <UploadedImage src={ast.fileMetadata.url} key={`image-${idx}`} />
                  else return <UploadedVideo video={ast as TVideo} key={`video-${idx}`} />;
              })
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
        <div>
          <h3 className="font-bold">Requisitos adicionales</h3>
          <ul className="list-disc mt-5 ml-5">{
            state.details.additionalRequirements.map((t, idx) => (
              <li key={`additional-requirement-${idx}`}>{t}</li>
            ))
          }</ul>
        </div>
      </div>
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
    </>
  )   
};

const PreviewFilter = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <span className="bg-white text-card py-1 px-3 rounded-md">
      {children}
    </span>
  )
};

export default ProjectPreviewSection
