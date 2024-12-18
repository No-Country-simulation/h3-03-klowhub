import { Check } from "lucide-react";

interface ObjectivesListProps {
  header: string
  objectives: string[]
}

export const ObjectivesList: React.FC<ObjectivesListProps> = ({ header, objectives }) => (
  <>
    <h3 className="text-sm font-semibold">{ header }</h3>
    <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
      {objectives.map((objective, index) => (
        <li key={index} className="flex items-center space-x-4">
          <Check className="text-primary-300" />
          <span className="text-sm text-gray-300">{objective}</span>
        </li>
      ))}
    </ul>
  </>
);
