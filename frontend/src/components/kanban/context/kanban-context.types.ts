import { TColumn, TTask } from "@/types/kanban.types";

export type KanbanContextType = {
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