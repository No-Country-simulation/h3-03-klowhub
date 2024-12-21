import { useContext } from "react";
import { KanbanContextType } from "./kanban-context.types";
import { KanbanContext } from "./kanban.contex";

export const useKanban = (): KanbanContextType => {
    const context = useContext(KanbanContext);
    if (!context) {
        console.error("useKanban must be used within a KanbanProvider");
    }
    return context;
};