"use client";

import Input from "@/components/input/input.component";
import useGenerateForm from "@/hooks/use-generate-form.hook";
import { Circles } from "react-loader-spinner";
import { FullProposal, Proposal } from "./proposal-form.types";
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
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";
import { BTChat } from "@/types/backend-responses.types";
import { useRouter } from "next/navigation";
import { TImage } from "@/types/global.types";

type Props = {
  author: {
    id: string
    name: string,
    email: string,
    role: string,
    profileImg: TImage,
  },
  title: string
}

const submitProposal = async (
  data: Proposal,
  title: string,
  author: {
    id: string
    name: string,
    email: string,
    role: string,
    profileImg: TImage,
  },
  applicantId: string,
  setLoading: (loading: boolean) => void,
  columns: TColumn[],
  tasks: TTask[]
) => {
  try {
    setLoading(true);

    const boardData = await createBoardWithDetails({
      projectName: title,
      columns,
      tasks,
      projectCreatorEmail: author.email
    });
    setLoading(false)

    const chatData = {
      members: [author.id, applicantId],
      type: "private"
    };

    const chatRes = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}`, {
      method: "post",
      body: JSON.stringify(chatData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!chatRes.ok) {
      const error = await chatRes.json();
      throw error.message
    };
    const chatPayload: BTChat = await chatRes.json();
    console.log('chatPayload: ', chatPayload);

    const firstMessageData = {
      userId: applicantId,
      content: data.message
    }

    const firstMessageRes = await fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/${chatPayload.id}/messages`, {
      method: "post",
      body: JSON.stringify(firstMessageData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!firstMessageRes.ok) {
      const error = await firstMessageRes.json();
      throw error.message
    };

    return chatPayload.id
  } catch (err) {
    console.error("coundl't send the proposal: ", err)
    return;
  }
};

const ProposalForm = ({ author, title }: Props) => {
  const [user] = useStore<BTUser>("user");
  const router = useRouter();

  const { controlledCommonProps, handleSubmit } = useGenerateForm<Proposal>(
    PROPOSAL_FORM_INITIAL_STATE,
    PROPOSAL_FORM_INITIAL_STATE
  );

  const { isKanbanOpen, setIsKanbanOpen, isEditTaskOpen, tasks, columns } =
    useKanban();

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-14 relative">
      {isKanbanOpen && <KanbanModal />}
      {isEditTaskOpen && <EditTaskModal />}
      {loading &&
        <div className="fixed flex-col gap-5 inset-0 flex items-center justify-center bg-[#9d32bc]/30 z-50">
          <Circles
            height="80"
            width="80"
            color="#b95ed4"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <span className="text-primary-200">
            Enviando Propuesta...
          </span>
        </div>
      }
      <form
        className="flex gap-10"
        onSubmit={handleSubmit(async (data) => {
          const chatId = await submitProposal(data, title, author, user.id, setLoading, columns, tasks)
          if (!chatId) return;
          router.push(`/chat?chatId=${chatId}`)
        })}
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
            type="button"
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
