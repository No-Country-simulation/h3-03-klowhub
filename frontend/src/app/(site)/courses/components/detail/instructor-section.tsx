import Image from "next/image";
import { Instructor } from "@/types/course-detail-props";
import Link from "next/link";
Link

interface InstructorInfoProps {
    instructor: Instructor;
}

export const InstructorInfo: React.FC<InstructorInfoProps> = ({ instructor }) => (
    <div className="flex flex-col md:flex-row items-center md:items-start space-x-3">
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
        <div className="space-y-2 md:space-y-0">
            <p className="font-semibold text-center md:text-left">{instructor.name}</p>
            <p className="text-sm text-gray-400">{instructor.description}</p>
        </div>
    </div>
);
