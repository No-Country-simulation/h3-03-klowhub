import { TImage } from "./global.types";

export type TProject = {
    id: number,
    img : TImage,
    description: string,
    platform : "PowerApps" | "AppSheet",
    tags: string[],
    rating: number,
    ratingCount: number,
    status: "En curso" | "Terminado",
    initialDate: string,
    finalDate: string,
}