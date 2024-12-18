"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PanelsTopLeft, SquareSplitHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKanban } from "../context/kanbanContext";
import KanbanBoard from "@/components/kanban/kanban-board-component";

const KanbanModal = () => {
    const {
        setIsKanbanOpen,
        columns,
        tasks,
        setTasks,
        setColumns,
        columnsBackup,
        setColumnsBackup,
        tasksBackup,
        setTasksBackup,
    } = useKanban();

    const handleCloseKanban = () => {
        setColumns([...columnsBackup]);
        setTasks([...tasksBackup]);
        setIsKanbanOpen(false);
    };

    const handleSaveData = () => {
        const defaultColumns = [
            { id: "column-tasks", name: "Tareas" },
            { id: "column-not-started", name: "No iniciado" },
            { id: "column-in-progress", name: "En proceso" },
            { id: "column-finished", name: "Terminado" }
        ];

        if (columns.length === 0) {
            setColumns(defaultColumns);
            setColumnsBackup(defaultColumns);
        } else {
            setTasksBackup([...tasks]);
            setColumnsBackup([...columns]);
        }

        setIsKanbanOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-10">
            <Card className="w-full p-5 h-[90vh] flex flex-col justify-between overflow-y-auto">
                <CardContent className="flex flex-col gap-3">
                    <div className="flex justify-end h-[40px]">
                        <button
                            className="bg-transparent hover:text-primary-300 transition-colors"
                            onClick={handleCloseKanban}
                        >
                            <X />
                        </button>
                    </div>
                    <div className="flex flex-col gap-5">
                        {/* Tabs */}
                        <ul className="h-[42px] flex border-b-2 gap-6 px-3.5 w-fit">
                            <li className="flex gap-1.5 justify-center items-center cursor-pointer">
                                <PanelsTopLeft className="text-primary-300 h-4" />
                                <span className="text-sm text-primary-300">
                                    Vista por estados
                                </span>
                            </li>
                            <li className="flex gap-1.5 justify-center items-center cursor-default">
                                <PanelsTopLeft className="h-4 text-[#111314]" />
                                <span className="text-sm text-[#111314]">Vista por etapas</span>
                            </li>
                            <li className="flex gap-1.5 justify-center items-center cursor-default">
                                <SquareSplitHorizontal className="h-4 text-[#111314]" />
                                <span className="text-sm text-[#111314]">Timeline</span>
                            </li>
                        </ul>

                        {/* Board */}
                        <KanbanBoard />
                    </div>
                </CardContent>
                <div className="flex justify-end">
                    <Button className="w-[250px]" onClick={handleSaveData}>
                        Guardar Propuesta
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default KanbanModal;
