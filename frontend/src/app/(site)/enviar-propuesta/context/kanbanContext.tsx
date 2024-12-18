import React, { createContext, useContext, useState, ReactNode } from "react";
import { TBoardData, TColumn, TTask } from "@/types/kanban.types";

interface KanbanContextType {
  columns: TColumn[];
  tasks: TTask[];
  columnsBackup: TColumn[];
  tasksBackup: TTask[];
  setTasks: React.Dispatch<React.SetStateAction<TTask[]>>;
  setTasksBackup: React.Dispatch<React.SetStateAction<TTask[]>>;
  setColumns: React.Dispatch<React.SetStateAction<TColumn[]>>;
  setColumnsBackup: React.Dispatch<React.SetStateAction<TColumn[]>>;
  isKanbanOpen: boolean;
  setIsKanbanOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskToEdit: TTask | null;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TTask | null>>;
  isEditTaskOpen: boolean;
  setIsEditTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

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

export const useKanban = (): KanbanContextType => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }
  return context;
};
