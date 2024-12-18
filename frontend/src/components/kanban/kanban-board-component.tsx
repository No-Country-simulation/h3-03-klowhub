"use client";

import { useState } from "react";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import { arrayMove } from "@dnd-kit/sortable";
import { TColumn, TTask } from "@/types/kanban.types";
import { useKanban } from "@/app/(site)/kanban/context/kanbanContext";
import ColumnContainer from "./column-container.component";
import TaskCard from "./task-card.component";

type Props = {
    editable?: boolean;
};

const KanbanBoard = ({ editable = true }: Props) => {
    const { setColumns, columns, tasks, setTasks } = useKanban();
    const columnsData: TColumn[] = columns.length !== 0 ? columns : [
        { id: "column-tasks", name: "Tareas" },
        { id: "column-not-started", name: "No iniciado" },
        { id: "column-in-progress", name: "En proceso" },
        { id: "column-finished", name: "Terminado" }
    ];

    const [activeTask, setActiveTask] = useState<TTask | null>(null);

    const createTask = (columnId: string) => {
        if (columns.length === 0) setColumns([...columnsData])
        const newTask: TTask = {
            id: generateId(),
            columnId,
            name: `Nueva actividad`,
        };
        setTasks([...tasks, newTask]);
    };

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === "TTask") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "TTask";
        const isOverATask = over.data.current?.type === "TTask";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);
                const overIndex = tasks.findIndex(t => t.id === overId);

                tasks[activeIndex].columnId = tasks[overIndex].columnId;

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "TColumn";
        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId);

                const updatedTasks = [...tasks];
                const updatedTask = { ...updatedTasks[activeIndex], columnId: overId.toString() };

                updatedTasks[activeIndex] = updatedTask;

                return updatedTasks;
            });
        }
    };

    const renderDnDContext = editable ? (
        <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
            {columnsData.map((column, index) => (
                <ColumnContainer
                    key={column.id}
                    column={column}
                    createTask={createTask}
                    tasks={tasks.filter((task) => task.columnId === column.id)}
                    index={index}
                />
            ))}
            {createPortal(<DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>, document.body)}
        </DndContext>
    ) : (
        columnsData.map((column, index) => (
            <ColumnContainer
                key={column.id}
                column={column}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === column.id)}
                index={index}
                editable={false}
            />
        ))
    );

    return (
        <div className="grid grid-cols-1 gap-5
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4">
            {renderDnDContext}
        </div>
    );
};

const generateId = () => {
    return Math.floor(Math.random() * 10001) + "";
};

export default KanbanBoard;