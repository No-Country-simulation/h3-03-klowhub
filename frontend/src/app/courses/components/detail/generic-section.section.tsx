import { FC } from "react";

interface Props {
  header: string
  text: string
}

export const GenericSection: FC<Props> = ({ header, text }) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">{header}</h3>
                <p className="text-gray-300 text-sm">{text}</p>
            </div>
        </div>
    )
}
