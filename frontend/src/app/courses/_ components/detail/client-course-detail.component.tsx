'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Review } from '@/components/shared/reviews/reviews';
import { reviews } from '@/mocks/reviews.mocks';
import { Badge } from '@/components/ui/badge';

import Image from 'next/image';
import Rating from '@/components/rating/rating.component';
import Icon from '@/components/icon/icon.component';

export default function ClientWrapper() {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="md:col-span-2 space-y-4">
            <h3 className="font-semibold text-sm">Gestión de inventarios con Power Apps</h3>
            <p className="text-sm text-gray-300">
                Descubre cómo transformar ideas en aplicaciones funcionales sin necesidad de programar, utilizando Power Apps. Este curso te guiará paso a paso para que aprendas a crear aplicaciones personalizadas que se adapten a tus necesidades, optimizando procesos y mejorando la eficiencia en tu trabajo o negocio.
            </p>
            <Rating rating={4.1} ratingCount={76} />
            <Image
                src="/temp/imgs/course-image.png"
                alt="Course Image"
                width={600}
                height={300}
                className="rounded-lg w-full h-96"
            />
            <div className="bg-[#FFFFFF0D] p-3 rounded-lg">
                <h2 className="text-sm font-semibold mb-2">Contenido gratuito</h2>
                <div className="flex space-x-4 overflow-x-auto">
                    {[1, 2, 4].map((lesson) => (
                        <div key={lesson} className="flex-shrink-0 w-60">
                            <Image
                                src="/temp/imgs/course-image.png"
                                alt={`Lección ${lesson}`}
                                width={150}
                                height={50}
                                className="rounded-lg w-full h-28"
                            />
                            <p className="text-left text-sm mt-2">Lección {lesson}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/temp/imgs/avatar.png"
                        alt="Instructor"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-semibold">Sebastián Rios</p>
                        <p className="text-sm text-gray-400">Experto en desarrollo de aplicaciones no-code</p>
                    </div>
                </div>
                <h3 className="text-sm font-semibold">Después de completar este curso, serás capaz de</h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                    {[
                        "Crear aplicaciones personalizadas desde cero utilizando Power Apps.",
                        "Automatizar tareas y optimizar procesos en tu entorno laboral o personal.",
                        "Diseñar interfaces de usuario intuitivas y funcionales sin necesidad de conocimientos en programación.",
                        "Integrar tus aplicaciones con otras herramientas y plataformas para maximizar su potencial.",
                        "Resolver problemas comunes y mejorar la eficiencia de tus proyectos mediante soluciones no-code."
                    ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-4">
                            <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vector-R4ZFPayhlqjmegr9aaqn3SUAeZoeqa.png"
                                alt="Checkmark"
                                width={20}
                                height={20}
                            />
                            <span className="text-sm text-gray-300">{item}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-sm font-semibold">Acerca de este curso</h3>
                <div>
                    <p className={`text-sm ${isExpanded ? 'text-gray-300' : 'text-gradient-mask'}`}>
                        Este curso está diseñado para quienes desean aprender a crear aplicaciones personalizadas de manera rápida y sencilla

                        Con ejemplos prácticos y explicaciones claras, te guiaré en el proceso de convertir tus ideas en aplicaciones funcionales.

                        Al finalizar el curso, tendr las habilidades necesarias para desarrollar aplicaciones profesionales utilizando Power Apps.
                    </p>
                </div>

                <div className={`${isExpanded ? 'block space-y-6 overflow-hidden' : 'hidden'}`}>

                    <Button className="mt-3 px-20">Añadir al Carrito</Button>

                    <div className="flex items-center gap-3 mt-6">
                        <span className="text-sm font-thin">compartir</span>
                        <div className="flex items-center gap-2">
                            <Icon style="h-5 w-5" name="mail" />
                            <Icon style="h-5 w-5" name="whatsapp" />
                            <Icon style="h-5 w-5" name="messenger" />
                            <Icon style="h-5 w-5" name="linkedin" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">¿Por qué aprender con Sebastián?</h3>
                        <p className="text-gray-300 text-sm">
                            Sebastián Ríos es un apasionado del desarrollo no-code, con más de 5 años de experiencia en AppSheet y un enfoque práctico y accesible para la enseñanza. Ha ayudado a cientos de profesionales y emprendedores a transformar sus ideas en aplicaciones exitosas, simplificando procesos y mejorando la productividad.
                        </p>
                        <h3 className="text-lg font-semibold">¿Por qué aprender con Sebastián?</h3>
                        <p className="text-gray-300 text-sm">
                            Sebastián Ríos es un apasionado del desarrollo no-code, con más de 5 años de experiencia en AppSheet y un enfoque práctico y accesible para la enseñanza. Ha ayudado a cientos de profesionales y emprendedores a transformar sus ideas en aplicaciones exitosas, simplificando procesos y mejorando la productividad.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Requisitos</h3>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                            {[
                                "Crear aplicaciones personalizadas desde cero utilizando Power Apps."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start space-x-4">
                                    <Image
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vector-R4ZFPayhlqjmegr9aaqn3SUAeZoeqa.png"
                                        alt="Checkmark"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">¿Qué incluye?</h3>
                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                            {[
                                "Crear aplicaciones personalizadas desde cero utilizando Power Apps.",
                                "Casos de estudio y ejemplos reales para aplicar lo aprendido en situaciones concretas."
                            ].map((item, index) => (
                                <li key={index} className="flex items-start space-x-4">
                                    <Image
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vector-R4ZFPayhlqjmegr9aaqn3SUAeZoeqa.png"
                                        alt="Checkmark"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-sm text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Información y Funcionalidades de la App</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#D194E2] rounded-md p-4">
                            <div className="flex flex-col gap-2 items-center">
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Funcionalidades</h3>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Badge>APIs - Integraciones</Badge>
                                    <Badge>APIs - Integraciones</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Herramientas y plataformas</h3>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Badge>Otras</Badge>
                                    <Badge>Otras</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Sector</h3>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Badge>Ventas y CRM</Badge>
                                    <Badge>Finanzas y contabilidad</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Pilar de contenido</h3>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Badge>Automatización</Badge>
                                    <Badge>Flujo de trabajo</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="border-b border-[#F3F3F3] space-y-2 pb-2">
                            <h3 className="text-lg font-semibold text-white">15 Reseñas</h3>
                            <div className="flex gap-2">
                                <Rating rating={4.7} showDetails={false} />
                                <span className="text-white">4.7</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {
                                reviews.map((review, index) => (
                                    <Review
                                        key={index + 1}
                                        author={review.author}
                                        rating={review.rating}
                                        comment={review.comment}
                                    />
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
            <Button
                variant="link"
                className="text-purple-400 flex items-center w-full"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Ver menos' : 'Ver más'}
            </Button>
        </div>
    );

};
