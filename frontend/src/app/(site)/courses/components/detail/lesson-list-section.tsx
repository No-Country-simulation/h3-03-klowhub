//import { Lesson } from "@/types/course-detail-props";
import { Lesson } from "@/types/courses.types";
import Image from "next/image";
import { getYoutubeId } from "@/utils/str.utils";

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
                        src={`https://img.youtube.com/vi/${getYoutubeId(lesson.link!!)}/0.jpg`}
                        alt={lesson.title}
                        width={1920}
                        height={1080}
                        className="rounded-lg w-full h-28"
                    />
                    <p className="text-left text-sm mt-2">{lesson.title}</p>
                </div>
            ))}
        </div>
    </div>
);
