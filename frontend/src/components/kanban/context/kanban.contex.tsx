import React, { createContext, useContext, useState, ReactNode } from "react";
import { TBoardData, TColumn, TTask } from "@/types/kanban.types";
import { KanbanContextType } from "./kanban-context.types";
import { KANBAN_INITIAL_STATE } from "./kanban-context.consts"

export const KanbanContext = createContext<KanbanContextType>(KANBAN_INITIAL_STATE);

export const KanbanProvider = ({ children }: { children: ReactNode }) => {

  const [columns, setColumns] = useState<TColumn[]>([]);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [columnsBackup, setColumnsBackup] = useState<TColumn[]>([]);
  const [tasksBackup, setTasksBackup] = useState<TTask[]>([]);
  const [isKanbanOpen, setIsKanbanOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TTask | null>(null);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  return (
    <KanbanContext.Provider
      value={{
        columns,
        setColumns,
        tasks,
        setTasks,
        columnsBackup,
        setColumnsBackup,
        tasksBackup,
        setTasksBackup,
        isKanbanOpen,
        setIsKanbanOpen,
        taskToEdit,
        setTaskToEdit,
        isEditTaskOpen,
        setIsEditTaskOpen
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
