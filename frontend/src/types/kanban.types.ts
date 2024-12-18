export type TColumn = {
    id: string;
    name: string;
}

export type TTask = {
    id: string;
    columnId: string;
    name: string;
    desc?: string;
    priority?: "ALTA" | "MEDIA" | "BAJA"
    sector?: "Diseño" | "Desarrollo";
    startDate?: string;
    endDate?: string;
    assignedUser?: {
        avatarUrl?: string,
        fullname: string
    }
}

export type TBoardData = {
    tasks: TTask[],
    columns: TColumn[]
}