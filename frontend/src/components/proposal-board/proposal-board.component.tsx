'use client'

import services from "@/services";
import { TColumn, TTask } from "@/types/kanban.types";
import { useEffect, useState } from "react";
import { useKanban } from "../kanban/context/use-kanban-context.hook";
import KanbanBoard from "../kanban/kanban-board.component";
import { fetchBoardData } from "./proposal-board.utils";

type Props = {
    boardId: string;
}

const ProposalBoard = ({ boardId }: Props) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {
        columns,
        setColumns,
        setTasks
    } = useKanban();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchBoardData(boardId, setLoading, setError);
                console.log(response, "response");
                if (response) {
                    setColumns(response.columns);
                    setTasks(response.tasks);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener los datos del tablero:", error);
                setError("No se pudo cargar el tablero.");
                setLoading(false);
            }
        };

        fetchData();
    }, [boardId]);

    return (
        <div>
            {loading && "Cargando..."}
            {error && error}
            {columns.length !== 0 && <KanbanBoard editable={false} />}
        </div>
    )
}

export default ProposalBoard