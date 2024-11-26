import { FC } from "react";

interface AdditionalDetailsProps {
    details: { title: string; content: string }[];
}

export const AdditionalDetails: FC<AdditionalDetailsProps> = ({ details }) => {
    return (
        <div className="space-y-6">
            {details.map((detail, index) => (
                <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold">{detail.title}</h3>
                    <p className="text-gray-300 text-sm">{detail.content}</p>
                </div>
            ))}
        </div>
    )
}
