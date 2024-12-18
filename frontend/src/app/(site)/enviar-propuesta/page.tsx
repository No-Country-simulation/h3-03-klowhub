"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useKanban } from "./context/kanbanContext";
import KanbanModal from "./components/kanban-modal.component";
import KanbanBoard from "@/components/kanban/kanban-board-component";
import EditTaskModal from "./components/edit-task-modal";
import services from "@/services";

const KanbanTestPage = () => {
    const {
        isKanbanOpen,
        setIsKanbanOpen,
        isEditTaskOpen,
        tasks,
        columns

    } = useKanban();

    const [boardData, setBoardData] = useState<{ boardId: string, boardUrl: string } | null>(null)
    const [loading, setLoading] = useState(false);

    const projectName = "Proyecto AppSheet";
    const projectCreatorEmail = "martinkunbrc1990@gmail.com"
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (columns.length === 0) {
            console.error("no hay marco de trabajo creado");
            return;
        }

        try {
            setLoading(true);
            const { response, status } = await services.createBoard({ boardName: projectName });

            if (!status) {
                console.error("Error al crear el tablero.");
                return;
            }

            const { id: boardId, shortUrl: boardUrl } = response;
            console.log(boardId, "boardId");

            const customFields = ["Prioridad", "Campo de trabajo", "Fecha de inicio", "Fecha de finalizacion", "Usuario asignado"];
            const customFieldData = await Promise.all(
                customFields.map(async (customField) => {
                    const { response: customFieldResponse } = await services.createCustomFieldOnBoard({
                        idModel: boardId,
                        modelType: "board",
                        name: customField,
                        type: "text",
                        pos: "bottom",
                    });
                    return { idCustomField: customFieldResponse.id, name: customFieldResponse.name };
                })
            );

            console.log("customFields", customFieldData);

            for (const column of columns) {
                const { response: listResponse, status: listStatus } = await services.createList({ boardId, listName: column.name });
                if (!listStatus) {
                    console.error(`Error al crear la lista: ${column.name}`);
                    continue;
                }

                const listId = listResponse.id;

                for (const task of tasks.filter((t) => t.columnId === column.id)) {
                    const { response: cardResponse } = await services.createCard(task.desc ? { listId, name: task.name, desc: task.desc } : { listId, name: task.name });
                    const idCard = cardResponse.id;

                    const fieldMappings: Record<string, string | undefined> = {
                        "Prioridad": task.priority,
                        "Fecha de inicio": task.startDate,
                        "Fecha de finalizacion": task.endDate,
                        "Campo de trabajo": task.sector,
                        "Usuario asignado": task.assignedUser?.fullname,
                    };

                    await Promise.all(
                        customFieldData.map(async (customField) => {
                            const value = fieldMappings[customField.name];
                            if (value) {
                                await services.updateCustomFieldItemOnCard({
                                    idCard,
                                    idCustomField: customField.idCustomField,
                                    value: { text: value },
                                });
                            }
                        })
                    );

                    console.log(idCard, "idCard");
                }
            }

            const inviteResponse = await services.inviteBoardMemberByEmail({
                boardId,
                memberEmail: projectCreatorEmail,
            });

            if (inviteResponse.status) {
                console.log(`Invitación enviada a: ${projectCreatorEmail}`);
                setBoardData({ boardId, boardUrl });
            } else {
                console.error("Error al enviar la invitación:", inviteResponse.error);
            }
        } catch (error) {
            console.error("Error durante la operación:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto mt-[200px] flex flex-col justify-center gap-10">
            {isKanbanOpen && <KanbanModal />}
            {isEditTaskOpen && <EditTaskModal />}
            <Button
                className="w-[200px] mx-auto"
                onClick={() => setIsKanbanOpen(!isKanbanOpen)}
                disabled={loading || boardData !== null}
            >
                {columns.length === 0 ? "Agregar marco de trabajo" : "Editar marco de trabajo"}
            </Button>

            {columns.length !== 0 && <KanbanBoard editable={false} />}

            <form className="mx-auto" onSubmit={handleSubmit}>
                {!loading && boardData === null && (
                    <Button type="submit">Enviar Propuesta</Button>
                )}
                {loading && <span className='text-sm flex gap-2 items-center h-[40px]'>
                    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    Enviando Propuesta...
                </span>}

                {boardData && <span className="flex gap-10">BoardId: {boardData.boardId} {<a href={boardData.boardUrl} target="_blank" className="text-primary-300">{boardData.boardUrl}</a>}</span>}
            </form>

        </div >
    );
};

export default KanbanTestPage;
