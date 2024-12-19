"use client";

import Input from "@/components/input/input.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Proposal } from "./proposal-form.types";
import { PROPOSAL_FORM_INITIAL_STATE } from "./proposal.consts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useKanban } from "@/components/kanban/context/use-kanban-context.hook";
import KanbanModal from "@/components/kanban/kanban-modal.component";
import EditTaskModal from "@/components/kanban/edit-task-modal.component";
import { useState } from "react";
import KanbanBoard from "@/components/kanban/kanban-board.component";
import { TColumn, TTask } from "@/types/kanban.types";
import { createBoardWithDetails } from "@/components/kanban/utils/kanban.utils";
import AuthorCard from "@/components/author-card/author-card.component";
import useStore from "@/contexts/store/use-store.hook";
import { User } from "@/contexts/store/store.types";

type Props = {
  projectAuthorId: string
}

const submitProposal = async (
  data: Proposal,
  projectAuthorId: string,
  applicantId: string,
  setLoading: (loading: boolean) => void,
  columns: TColumn[],
  tasks: TTask[]
) => {
  console.log("data: ", data);

  setLoading(true);
  //funcion para crear tablero en trello.
  const boardData = await createBoardWithDetails({
    projectName: "Proyecto Demo",
    columns: [{ id: "1", name: "Columna 1" }],
    tasks: [
      { columnId: "1", name: "Tarea 1", priority: "Alta", startDate: "2024-12-19", assignedUser: { fullname: "Juan Pérez" } },
    ],
    projectCreatorEmail: "martinkunbrc1990@gmail.com"
  });
  setLoading(false)

  const fullProposal = {
    ...boardData,
    projectAuthorId,
    applicantId,
    proposalMesage: data.message
  };

  console.log('fullProposal: ', fullProposal);

  // await fetch(`${process.env.NEXT_PUBLIC_PROJECTS_URL}/proposal`, {
  //   method: "post",
  //   body: JSON.stringify(fullProposal),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // });

};

const ProposalForm = ({ projectAuthorId }: Props) => {
  const [ user ] = useStore<User>("user");

  const { controlledCommonProps, handleSubmit } = useGenerateForm<Proposal>(
    PROPOSAL_FORM_INITIAL_STATE,
    PROPOSAL_FORM_INITIAL_STATE
  );

  const { isKanbanOpen, setIsKanbanOpen, isEditTaskOpen, tasks, columns } =
    useKanban();

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-14">
      {isKanbanOpen && <KanbanModal />}
      {isEditTaskOpen && <EditTaskModal />}
      <form
        className="flex gap-10"
        onSubmit={handleSubmit((data) =>
          submitProposal(data, projectAuthorId, user.id, setLoading, columns, tasks)
        )}
        id="proposal-form"
      >
        <div className="flex flex-col gap-3 w-full lg:w-3/4 relative">
          <Input
            name="message"
            type="richtext"
            label="Envía tu propuesta al cliente"
            placeholder="Detalla aquí tu propuesta"
            className="w-full"
            {...controlledCommonProps}
          />
          <Button
            onClick={() => setIsKanbanOpen(!isKanbanOpen)}
            disabled={loading}
            className="z-10 md:z-0 md:absolute w-fit top-[40px] text-xs md:text-sm right-1 md:right-6 md:w-fit md:top-[50px] md:h-[35px]"
          >
            {columns.length === 0
              ? "Agregar marco de trabajo"
              : "Editar marco de trabajo"}
          </Button>
        </div>
        <div className="w-1/4 rounded-xl overflow-hidden hidden lg:block">
          <div className="h-28" style={{ position: "relative" }}>
            <Image
              src="/imgs/proposal-form-advice.webp"
              alt="Sugerencia para enviar una propuesta"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className="flex flex-col gap-3 bg-gray-100 p-4 text-sm">
            <span>
              Aprendé a enviar propuestas efectivas con nuestros consejos.
              Descubrí cómo destacarte y aumentar tus oportunidades.
            </span>
            <Link
              href="#"
              scroll={false}
              className="text-center text-primary-300"
            >
              Ver consejos
            </Link>
          </div>
        </div>
      </form>
      <div className="w-full flex flex-col lg:w-3/4 lg:pr-[28px]">
        {columns.length !== 0 && !isKanbanOpen && (
          <KanbanBoard editable={false} />
        )}
      </div>
    </div>
  );
};

export default ProposalForm;
