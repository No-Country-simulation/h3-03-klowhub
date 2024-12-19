import services from "@/services";

export async function createBoardWithDetails({
    projectName,
    columns,
    tasks,
    projectCreatorEmail,
}: {
    projectName: string;
    columns: Array<{ id: string; name: string }>;
    tasks: Array<{ columnId: string; name: string; desc?: string; priority?: string; startDate?: string; endDate?: string; sector?: string; assignedUser?: { fullname: string } }>;
    projectCreatorEmail: string;
}): Promise<{ boardId: string; boardUrl: string } | null> {
    if (columns.length === 0) {
        console.error("No hay marco de trabajo creado");
        return null;
    }

    try {
        const { response, status } = await services.createBoard({ boardName: projectName });

        if (!status) {
            console.error("Error al crear el tablero.");
            return null;
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
        } else {
            console.error("Error al enviar la invitación:", inviteResponse.error);
        }

        return { boardId, boardUrl };
    } catch (error) {
        console.error("Error durante la operación:", error);
        return null;
    }
}