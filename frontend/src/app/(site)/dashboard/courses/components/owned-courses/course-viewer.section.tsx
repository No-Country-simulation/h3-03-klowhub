"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Inbox } from "lucide-react";
import YouTube from "react-youtube";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getYoutubeProps } from "@/utils/youtube.utils";

interface Module {
    title: string;
    description: string;
    lessons: {
        id: string;
        title: string;
        freeLesson: boolean;
        link: string | null;
        video: {
            id: string;
            fileType: string;
            fileMetadata: {
                url: string;
                format: string; // 
                thumbnailUrl: string;
                width: number;
                height: number;
            };
        } | null;
    }[];
}

interface CourseViewerProps {
    modules: Module[];
}

export const CourseViewer = ({ modules }: CourseViewerProps) => {

    const [currentVideo, setCurrentVideo] = useState<{
        module: string | null;
        lessonId: string | null;
        type: "video" | "youtube";
        link: string | null;
    }>({
        module: modules[0]?.title || null,
        lessonId: modules[0]?.lessons[0]?.id || null,
        type: modules[0]?.lessons[0]?.freeLesson ? "youtube" : "video",
        link: modules[0]?.lessons[0]?.freeLesson ? modules[0]?.lessons[0]?.link : modules[0]?.lessons[0]?.video?.fileMetadata.url!!,
    });

    const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.title || ""]);

    const toggleModule = (moduleTitle: string) => {
        setExpandedModules((prev) =>
            prev.includes(moduleTitle) ? prev.filter((title) => title !== moduleTitle) : [...prev, moduleTitle]
        );
    };

    return (
        <div className="text-white bg-card rounded-lg">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                            {currentVideo.type === "video" ? (
                                <video controls className="absolute inset-0 w-full h-full rounded-lg">
                                    <source src={currentVideo.link || ""} type="video/mp4" />
                                </video>
                            ) : (
                                <YouTube {...getYoutubeProps(currentVideo.link || "")} className="absolute inset-0 w-full h-full" />
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Tabs defaultValue="lecciones" className="w-full">
                            <TabsList className="w-full bg-gray-800">
                                <TabsTrigger value="lecciones" className="flex-1">
                                    Lecciones
                                </TabsTrigger>
                                <TabsTrigger value="consultas" className="flex-1">
                                    Consultas
                                </TabsTrigger>
                                <TabsTrigger value="recursos" className="flex-1">
                                    Recursos
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="lecciones" className="mt-4">
                                <div className="space-y-2">
                                    {modules.map((module, index) => (
                                        <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleModule(module.title)}
                                                className="w-full p-4 flex items-center justify-between hover:bg-gray-700"
                                            >
                                                <div className={`flex items-center justify-center gap-3 ${expandedModules.includes(module.title) ? "text-primary-300" : ""}`}>
                                                    <Inbox className="h-5 w-5" />
                                                    <span className="font-medium">{module.title}</span>
                                                </div>
                                                {expandedModules.includes(module.title) ? (
                                                    <ChevronUp className="h-5 w-5 text-primary-300" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                            {expandedModules.includes(module.title) && (
                                                <div className="border-l ml-8">
                                                    <div className="bg-gray-700 ml-4 rounded-xl">
                                                        {module.lessons.map((lesson, index) => (
                                                            <button
                                                                key={lesson.id}
                                                                onClick={() =>
                                                                    setCurrentVideo({
                                                                        module: module.title,
                                                                        lessonId: lesson.id,
                                                                        type: lesson.freeLesson ? "youtube" : "video",
                                                                        link: lesson.freeLesson
                                                                            ? lesson.link
                                                                            : lesson.video?.fileMetadata.url!!,
                                                                    })
                                                                }
                                                                className={cn(
                                                                    "w-full p-3 text-left text-sm hover:bg-slate-50 hover:text-primary-400 rounded-xl flex items-center gap-2",
                                                                    currentVideo.module === module.title &&
                                                                    currentVideo.lessonId === lesson.id &&
                                                                    "bg-slate-50 text-primary-400"

                                                                )}
                                                            >
                                                                <span className="flex-1 truncate">{lesson.title}</span>
                                                                {lesson.freeLesson && (
                                                                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">Gratis</span>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="consultas">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p>Sección de consultas en desarrollo</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="recursos">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p>Sección de recursos en desarrollo</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 'use client'

// import { useState } from 'react'
// import { ChevronDown, ChevronUp } from 'lucide-react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { cn } from "@/lib/utils"

// interface Module {
//     title: string
//     description: string
//     lessons: {
//         id: string
//         title: string
//         freeLesson: boolean
//         link: string | null
//         video: {
//             id: string;
//             fileType: string;
//             fileMetadata: {
//                 url: string;
//                 format: string;
//                 thumbnailUrl: string;
//                 width: number;
//                 height: number;
//             };
//         } | null
//     }[]
// }

// interface CourseViewerProps {
//     modules: Module[]
// }

// export const CourseViewer = ({ modules }: CourseViewerProps) => {

//     const [activeVideo, setActiveVideo] = useState(modules[0]?.lessons[0]?.link || '')
//     const [expandedModules, setExpandedModules] = useState<string[]>([modules[0]?.title || ''])

//     const toggleModule = (moduleTitle: string) => {
//         setExpandedModules(prev =>
//             prev.includes(moduleTitle)
//                 ? prev.filter(title => title !== moduleTitle)
//                 : [...prev, moduleTitle]
//         )
//     }

//     return (
//         <div className="text-white bg-card rounded-lg">
//             <div className="container mx-auto p-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     <div className="lg:col-span-2 space-y-4">
//                         <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
//                             <video controls className="absolute inset-0 w-full h-full">
//                                 <source
//                                     src={activeVideo}
//                                     type='video/mp4'
//                                 />
//                             </video>
//                         </div>
//                         <div className="bg-gray-800 p-4 rounded-lg">
//                             <h2 className="text-xl font-semibold mb-2">Vista previa</h2>
//                             <div className="flex gap-4 overflow-x-auto pb-4">
//                                 {modules.flatMap(module =>
//                                     module.lessons.map(lesson => (
//                                         <button
//                                             key={lesson.id}
//                                             onClick={() => setActiveVideo(lesson.link!!)}
//                                             className="flex-shrink-0 w-48"
//                                         >
//                                             <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary transition-all">
//                                                 <img
//                                                     src="/placeholder.svg?height=200&width=300"
//                                                     alt={lesson.title}
//                                                     className="w-full h-full object-cover"
//                                                 />
//                                             </div>
//                                             <p className="mt-2 text-sm text-gray-300 truncate">{lesson.title}</p>
//                                         </button>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-1">
//                         <Tabs defaultValue="lecciones" className="w-full">
//                             <TabsList className="w-full bg-gray-800">
//                                 <TabsTrigger value="lecciones" className="flex-1">Lecciones</TabsTrigger>
//                                 <TabsTrigger value="consultas" className="flex-1">Consultas</TabsTrigger>
//                                 <TabsTrigger value="recursos" className="flex-1">Recursos</TabsTrigger>
//                             </TabsList>
//                             <TabsContent value="lecciones" className="mt-4">
//                                 <div className="space-y-2">
//                                     {modules.map((module, index) => (
//                                         <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
//                                             <button
//                                                 onClick={() => toggleModule(module.title)}
//                                                 className="w-full p-4 flex items-center justify-between hover:bg-gray-700"
//                                             >
//                                                 <span className="font-medium">{module.title}</span>
//                                                 {expandedModules.includes(module.title) ? (
//                                                     <ChevronUp className="h-5 w-5" />
//                                                 ) : (
//                                                     <ChevronDown className="h-5 w-5" />
//                                                 )}
//                                             </button>
//                                             {expandedModules.includes(module.title) && (
//                                                 <div className="border-t border-gray-700">
//                                                     {module.lessons.map((lesson) => (
//                                                         <button
//                                                             key={lesson.id}
//                                                             onClick={() => setActiveVideo(lesson.link!!)}
//                                                             className={cn(
//                                                                 "w-full p-3 text-left text-sm hover:bg-gray-700 flex items-center gap-2",
//                                                                 activeVideo === lesson.link && "bg-gray-700"
//                                                             )}
//                                                         >
//                                                             <span className="flex-1 truncate">{lesson.title}</span>
//                                                             {lesson.freeLesson && (
//                                                                 <span className="text-xs bg-primary px-2 py-1 rounded">
//                                                                     Gratis
//                                                                 </span>
//                                                             )}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </TabsContent>
//                             <TabsContent value="consultas">
//                                 <div className="bg-gray-800 p-4 rounded-lg">
//                                     <p>Sección de consultas en desarrollo</p>
//                                 </div>
//                             </TabsContent>
//                             <TabsContent value="recursos">
//                                 <div className="bg-gray-800 p-4 rounded-lg">
//                                     <p>Sección de recursos en desarrollo</p>
//                                 </div>
//                             </TabsContent>
//                         </Tabs>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

