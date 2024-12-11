import { FC } from "react";
import { Instructor } from "@/types/course-detail-props";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, User, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const InstructorDetail: FC<Instructor> = ({
    name,
    description,
    image,
    rating,
    students,
    courses,
    profileLink
}) => {

    return (
        <Card className="p-3">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center space-x-2 px-2 border-b border-[#DFD1F3] pb-2">
                        <Image
                            src={image}
                            alt={name}
                            width={40}
                            height={40}
                            className="rounded-full mb-1 border-b-white"
                        />
                        <div className="space-y-2">
                            <p className="font-semibold">{name}</p>
                            <p className="text-xs text-gray-400">{description}</p>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 rounded-lg space-y-2">
                    <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">Calificación del instructor: {rating}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">{students?.toLocaleString()} Estudiantes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">{courses} Cursos</span>
                    </div>
                </div>
                <div className="w-full flex justify-end px-2">
                    <Link href={profileLink || '#'}>
                        <span className="text-[#D194E2] text-sm text-end">Visitar Perfil</span>
                    </Link>
                </div>
            </CardContent> 
        </Card>
    );

};
