import ClientWrapper from "./client-course-detail.component";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image";
import { Star, User, BookOpen, Plus, Minus, SigmaIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icon/icon.component";
import { Button } from "@/components/ui/button";
import { SimilarCourses } from "./similar-courses.component";

export const ParentComponent = () => {
    return (
        <div className="min-h-screen space-y-10">
            <div className="mt-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-14">
                <ClientWrapper />
                <div className="space-y-6">
                    <Card className="p-3">
                        <CardHeader>
                            <CardTitle>
                                <div className="flex items-center space-x-2 px-2 border-b border-[#DFD1F3] pb-2">
                                    <Image
                                        src="/temp/imgs/avatar.png"
                                        alt="Instructor"
                                        width={40}
                                        height={40}
                                        className="rounded-full mb-1 border-b-white"
                                    />
                                    <div className="space-y-2">
                                        <p className="font-semibold">Sebastián Rico</p>
                                        <p className="text-xs text-gray-400">Instructor y desarrollador</p>
                                    </div>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-lg space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm">Calificación del instructor: 4.3</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm">43,830 Estudiantes</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <BookOpen className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm">77 Cursos</span>
                                </div>
                            </div>
                            <div className="w-full flex justify-end px-2">
                                <Link href='/mentor'>
                                    <span className="text-[#D194E2] text-sm text-end">Visitar Perfil</span>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Badge
                        className="bg-[#1F2937] text-white w-full shadow-hrd flex justify-center"
                        icon={<Icon name="power-apps" style="w-8 h-8" />}
                    >
                        AppSheet
                    </Badge>

                    <div>
                        <h3 className="font-semibold text-sm">Programa del Curso</h3>
                        <Card>
                            <CardContent className="mt-2">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="module-1" className="px-4">
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-3">
                                                <Plus className="w-4 h-4" />
                                                <h3 className="text-sm font-semibold text-[#B95ED4]">Módulo 1</h3>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="text-sm text-gray-300 space-y-2">
                                                <li className="flex space-x-3">
                                                    <Minus className="w-4 h-4" />
                                                    <span>Lección 1: ¿Qué es Power Apps?</span>
                                                </li>
                                                <li className="flex space-x-3">
                                                    <Minus className="w-4 h-4" />
                                                    <span>Lección 2: Configuración de la cuenta y entorno de trabajo</span>
                                                </li>
                                                <li className="flex space-x-3">
                                                    <Minus className="w-4 h-4" />
                                                    <span>Lección 3: Navegación por la interfaz de Power Apps</span>
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="module-2" className="px-4">
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-3">
                                                <Plus className="w-4 h-4" />
                                                <h3 className="text-sm font-semibold text-[#B95ED4]">Módulo 1</h3>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="text-sm text-gray-300 space-y-2">
                                                <li className="flex space-x-3">
                                                    <Minus className="w-4 h-4" />
                                                    <span>Contenido del Mòdulo 2</span>
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="module-3" className="px-4">
                                        <AccordionTrigger>
                                            <div className="flex items-center gap-3">
                                                <Plus className="w-4 h-4" />
                                                <h3 className="text-sm font-semibold text-[#B95ED4]">Módulo 1</h3>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="text-sm text-gray-300 space-y-2">
                                                <li className="flex space-x-3">
                                                    <Minus className="w-4 h-4" />
                                                    <span>Contenido del Mòdulo 3</span>
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    <Button className="w-full">Comprar curso</Button>
                    <Button variant="outline" className="w-full">Añadir al carrito</Button>
                </div>
            </div>
            <SimilarCourses />
        </div>
    );
}
