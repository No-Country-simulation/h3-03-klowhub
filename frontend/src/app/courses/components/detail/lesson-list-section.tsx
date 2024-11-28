import { Lesson } from "@/types/course-detail-props";
import Image from "next/image";

interface LessonListProps {
    lessons: Lesson[];
}

export const LessonList: React.FC<LessonListProps> = ({ lessons }) => (
    <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
        <h2 className="text-sm font-semibold mb-2">Contenido gratuito</h2>
        <div className="flex space-x-4 overflow-x-auto">
            {lessons.map((lesson) => (
                <div key={lesson.id} className="flex-shrink-0 w-60">
                    <Image
                        src={lesson.image}
                        alt={lesson.title}
                        width={150}
                        height={50}
                        className="rounded-lg w-full h-28"
                    />
                    <p className="text-left text-sm mt-2">{lesson.title}</p>
                </div>
            ))}
        </div>
    </div>
);
