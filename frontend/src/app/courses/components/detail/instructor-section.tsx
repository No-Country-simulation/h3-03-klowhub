import Image from "next/image";
import { Instructor } from "@/types/course-detail-props";
import Link from "next/link";
Link

interface InstructorInfoProps {
    instructor: Instructor;
}

export const InstructorInfo: React.FC<InstructorInfoProps> = ({ instructor }) => (
    <div className="flex items-start space-x-3">
        <div className="flex flex-col items-center gap-2 w-24 h-24">
            <Image
                src={instructor.image}
                alt={instructor.name}
                width={64}
                height={64}
                className="rounded-full"
            />
            <Link href="/mentor" className="text-xs">Ver Perfil</Link>
        </div>
        <div>
            <p className="font-semibold">{instructor.name}</p>
            <p className="text-sm text-gray-400">{instructor.description}</p>
        </div>
    </div>
);
