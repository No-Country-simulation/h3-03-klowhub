import Image from "next/image";
import { FC } from "react";

interface RequirementsListProps {
    requirements: string[];
}

export const RequirementsSection: FC<RequirementsListProps> = ({ requirements }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Requisitos</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-4">
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vector-R4ZFPayhlqjmegr9aaqn3SUAeZoeqa.png"
                            alt="Checkmark"
                            width={20}
                            height={20}
                        />
                        <span className="text-sm text-gray-300">{requirement}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
