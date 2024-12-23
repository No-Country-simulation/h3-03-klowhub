"use client";
import { KanbanProvider } from "@/components/kanban/context/kanban.contex";
import ProposalForm from "./proposal-form.component";
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

const ProposalFormWithKanbanContext = ({ author, title }: Props) => {
    return (
        <KanbanProvider>
            <ProposalForm author={author} title={title} />
        </KanbanProvider>
    );
};

export default ProposalFormWithKanbanContext;
