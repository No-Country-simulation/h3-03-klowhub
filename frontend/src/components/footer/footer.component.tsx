import { FC } from "react";
import Link from "next/link"
import { Facebook, Linkedin, Twitter } from "lucide-react"


export const Footer: FC = () => {

    return (
        <footer className="text-white mt-auto" style={{ background: "linear-gradient(263.17deg, #201C2D 0.4%, #201D43 50.02%, #262136 99.65%)" }}>
            <div className="container mx-auto px-20 py-10">
                <div className="flex flex-col gap-10 md:gap-32 md:flex-row">
                    <div className="space-y-3">
                        <h3 className="text-xs font-thin text-[#FFFFFF80]">Categorías</h3>
                        <ul className="space-y-2 font-thin">
                            <li><Link href="/cursos" className="text-xs hover:text-slate-300 transition-colors">Cursos</Link></li>
                            <li><Link href="/aplicaciones" className="text-xs hover:text-slate-300 transition-colors">Aplicaciones</Link></li>
                            <li><Link href="/vende-curso" className="text-xs hover:text-slate-300 transition-colors">Vende un Curso</Link></li>
                            <li><Link href="/app" className="text-xs hover:text-slate-300 transition-colors">Vende una App</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-thin text-[#FFFFFF80]">Acerca De</h3>
                        <ul className="space-y-2 font-thin">
                            <li><Link href="/instructores" className="text-xs hover:text-slate-300 transition-colors">Instructores</Link></li>
                            <li><Link href="/cursos" className="text-xs hover:text-slate-300 transition-colors">Cursos</Link></li>
                            <li><Link href="/terminos" className="text-xs hover:text-slate-300 transition-colors">Términos del Servicio</Link></li>
                            <li><Link href="/privacidad" className="text-xs hover:text-slate-300 transition-colors">Políticas de Privacidad</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-thin text-[#FFFFFF80]">Soporte</h3>
                        <ul className="space-y-2 font-thin">
                            <li><Link href="/faq" className="text-xs hover:text-slate-300 transition-colors">FAQ</Link></li>
                            <li><Link href="/contacto" className="text-xs hover:text-slate-300 transition-colors">Contacto</Link></li>
                            <li><Link href="/foro" className="text-xs hover:text-slate-300 transition-colors">Foro</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-thin text-[#FFFFFF80]">Encuentranos En</h3>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="hover:text-slate-300 transition-colors" aria-label="Facebook">
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="https://twitter.com" className="hover:text-slate-300 transition-colors" aria-label="Twitter">
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link href="https://linkedin.com" className="hover:text-slate-300 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center py-3 border-t border-[#8D8D8D]">
                <p className="text-xs font-thin text-slate-400">
                    © KlowHub.
                </p>
            </div>
        </footer>
    );

};
