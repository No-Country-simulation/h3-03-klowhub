import { FC } from "react";
import { AppDetailHeader } from "./app-detail.types";
import Rating from "@/components/rating/rating.component";
import Image from "next/image";
import { Clock } from "lucide-react";

export const AppHeader: FC<AppDetailHeader> = ({
    title,
    shortDescription,
    rating,
    ratingCount,
    coverImg
}) => {

    return (
        <>
            <h3 className="font-semibold text-sm">{title}</h3>
            <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-xs">Ultima actualización: 12/06/2024</span>
            </div>
            <p className="text-sm text-gray-300">{shortDescription}</p>
            <Rating
                rating={rating ?? 0}
                ratingCount={ratingCount}
            />
            <Image
                src={coverImg.fileMetadata.url}
                alt="Course Image"
                width={600}
                height={300}
                className="rounded-lg w-full h-96"
            />

            <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Vista Previa</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    <div className="flex-shrink-0 w-60">
                        <Image
                            src={coverImg.fileMetadata.url}
                            alt=""
                            width={1920}
                            height={1080}
                            className="rounded-lg w-full h-28 cursor-pointer object-cover"

                        />
                    </div>

                </div>
            </div>
            
        </>
    );

};
