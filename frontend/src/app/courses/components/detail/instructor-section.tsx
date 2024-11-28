import Image from "next/image";
import { Instructor } from "@/types/course-detail-props";

interface InstructorInfoProps {
    instructor: Instructor;
}

export const InstructorInfo: React.FC<InstructorInfoProps> = ({ instructor }) => (
    <div className="flex items-center space-x-4">
        <Image
            src={instructor.image}
            alt={instructor.name}
            width={64}
            height={64}
            className="rounded-full"
        />
        <div>
            <p className="font-semibold">{instructor.name}</p>
            <p className="text-sm text-gray-400">{instructor.description}</p>
        </div>
    </div>
);
