import services from "@/services";
import { TColumn, TTask } from "@/types/kanban.types";

export const fetchBoardData = async (boardId: string, setLoading: (value: boolean) => void, setError: (value: string | null) => void) => {
    try {
        await services.getBoard(boardId);

        let columns: TColumn[] = [];

        const listsDataResponse = await services.getListsOnBoard(boardId);
        if (Array.isArray(listsDataResponse.response)) {
            columns = listsDataResponse.response.map(list => ({
                id: list.id,
                name: list.name,
            }));
        } else {
            console.error("listsDataResponse.response no es un array");
        }

        let customFields: { idCustomField: string, name: string }[] = [];

        const customFieldsDataResponse = await services.getCustomFieldsOnBoard(boardId);
        if (Array.isArray(customFieldsDataResponse.response)) {
            customFields = customFieldsDataResponse.response.map(field => ({
                idCustomField: field.id,
                name: field.name,
            }));
        } else {
            console.error("customFieldsDataResponse.response no es un array");
        }

        let tasks: TTask[] = [];

        const cardsDataResponse = await services.getCardsOnBoard(boardId);
        if (Array.isArray(cardsDataResponse.response)) {
            tasks = cardsDataResponse.response.map(card => {
                const task: TTask = {
                    id: card.id,
                    columnId: card.idList,
                    name: card.name,
                };

                if (card.desc) {
                    task.desc = card.desc;
                }

                return task;
            });
        } else {
            console.error("cardsDataResponse.response no es un array");
        }

        for (const task of tasks) {
            let customFieldValues: { name: string, value: { text: string } }[] = [];
            const customFieldItemsData = await services.getCustomFieldItems(task.id);

            if (Array.isArray(customFieldItemsData.response)) {
                const taskCustomFieldValues = customFieldItemsData.response
                    .map(item => {
                        const matchingField = customFields.find(field => field.idCustomField === item.idCustomField);
                        if (matchingField && item.value?.text) {
                            return {
                                name: matchingField.name,
                                value: item.value,
                            };
                        }
                        return null;
                    })
                    .filter(value => value !== null);

                customFieldValues = [...customFieldValues, ...taskCustomFieldValues];

                for (const customFieldValue of customFieldValues) {
                    if (customFieldValue.name === "Prioridad") {
                        task.priority = customFieldValue.value.text as "ALTA" | "MEDIA" | "BAJA";
                    }

                    if (customFieldValue.name === "Usuario asignado") {
                        task.assignedUser = {
                            fullname: customFieldValue.value.text,
                        };
                    }

                    if (customFieldValue.name === "Fecha de inicio") {
                        task.startDate = customFieldValue.value.text;
                    }

                    if (customFieldValue.name === "Fecha de finalizacion") {
                        task.endDate = customFieldValue.value.text;
                    }

                    if (customFieldValue.name === "Campo de trabajo") {
                        task.sector = customFieldValue.value.text as "Diseño" | "Desarrollo";
                    }
                }
            } else {
                console.error(`customFieldItemsData.response no es un array para la tarea ${task.id}`);
            }
        }

        const response: { tasks: TTask[], columns: TColumn[] } = { columns: columns, tasks: tasks };

        return response;

    } catch {
        setLoading(false);
        setError("No existe un tablero con ese ID");
    }
}