import { FC } from "react"
import { Check } from "lucide-react"

type Props = {
  data: string[]
}

export const IncludeSection: FC<Props> = ({ data }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">¿Qué incluye?</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                {data.map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
                        <Check className="text-primary-300" />
                        <span className="text-sm text-gray-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
