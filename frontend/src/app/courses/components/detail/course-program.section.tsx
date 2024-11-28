import { FC } from "react";
import { ProgramModule } from "@/types/course-detail-props";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface CourseProgramProps {
    program: ProgramModule[];
}

export const CourseProgramSection: FC<CourseProgramProps> = ({ program }) => {

    return (
        <div>
            <h3 className="font-semibold text-sm">Programa del Cursos</h3>
            <Card>
                <CardContent className="mt-2">
                    <Accordion type="single" collapsible className="w-full">
                        {program.map((module, index) => (
                            <AccordionItem key={index} value={`module-${index}`} className="px-4">
                                <AccordionTrigger>
                                    <div className="flex items-center gap-3">
                                        <Plus className="w-4 h-4" />
                                        <h3 className="text-sm font-semibold text-[#B95ED4]">{module.moduleTitle}</h3>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-sm text-gray-300 space-y-2">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <li key={lessonIndex} className="flex space-x-3">
                                                <Minus className="w-4 h-4" />
                                                <span>{lesson}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );

};
