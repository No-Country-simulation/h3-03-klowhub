import Image from "next/image";

interface ObjectivesListProps {
    objectives: string[];
}

export const ObjectivesList: React.FC<ObjectivesListProps> = ({ objectives }) => (
    <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
        {objectives.map((objective, index) => (
            <li key={index} className="flex items-center space-x-4">
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vector-R4ZFPayhlqjmegr9aaqn3SUAeZoeqa.png"
                    alt="Checkmark"
                    width={20}
                    height={20}
                />
                <span className="text-sm text-gray-300">{objective}</span>
            </li>
        ))}
    </ul>
);
