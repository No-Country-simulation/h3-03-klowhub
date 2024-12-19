"use client";
import { KanbanProvider } from "@/components/kanban/context/kanban.contex";
import ProposalForm from "./proposal-form.component";

type Props = {
  projectAuthorId: string
}

const ProposalFormWithKanbanContext = ({ projectAuthorId }: Props) => {
    return (
        <KanbanProvider>
            <ProposalForm projectAuthorId={projectAuthorId} />
        </KanbanProvider>
    );
};

export default ProposalFormWithKanbanContext;
