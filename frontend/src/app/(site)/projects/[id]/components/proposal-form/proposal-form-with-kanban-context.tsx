"use client";
import { KanbanProvider } from "@/components/kanban/context/kanban.contex";
import ProposalForm from "./proposal-form.component";

const ProposalFormWithKanbanContext = () => {
    return (
        <KanbanProvider>
            <ProposalForm />
        </KanbanProvider>
    );
};

export default ProposalFormWithKanbanContext;