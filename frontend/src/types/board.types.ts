export type TBoardList = {
    id: string;
    name: string;
}

export type TActivityCard = {
    id: string;
    idList: string;
    name: string;
    desc?: string;
    priority?: "ALTA" | "MEDIA" | "BAJA"
    sector?: "Diseño" | "Desarrollo";
    startDate?: string;
    endDate?: string;
    assignedUser?: {
        avatarUrl: string,
        fullname: string
    }
}