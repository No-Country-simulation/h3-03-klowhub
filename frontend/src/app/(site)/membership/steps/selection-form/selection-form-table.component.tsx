import { CheckCircle } from 'lucide-react'

const Table = () => {
    return (
        <div className="overflow-hidden moverflow-x-visible whitespace-normal">
            {/* Fila 1 */}
            <div className="flex">
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center rounded-tl-lg border-l-2 border-t-2 flex items-center justify-center px-8">
                    <span className="w-full text-start">Comparar planes</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-t-2 flex items-center justify-center px-8">
                    <div className="flex flex-col gap-2.5">
                        <span>Free</span>
                        <span className="text-sm text-primary-200 font-semibold">Seleccionar plan</span>
                    </div>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-t-2 flex items-center justify-center px-8">
                    <div className="flex flex-col gap-2.5 items-center">
                        <div className="flex items-center"><span className="text-base">$25/</span><span className="text-sm">Mes</span></div>
                        <span className="text-sm text-primary-200 font-semibold">Seleccionar plan</span>
                    </div>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center rounded-tr-lg border-r-2 border-t-2 flex items-center justify-center px-8">
                    <div className="flex flex-col gap-2.5 items-center">
                        <div className="flex items-center"><span className="text-base">$25/</span><span className="text-sm">Mes</span></div>
                        <span className="text-sm text-primary-200 font-semibold">Seleccionar plan</span>
                    </div>
                </div>
            </div>
            {/* Fila 2 */}
            <div className="flex">
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-l-2 flex items-center justify-center px-8">
                    <span className="w-full text-start">Aspecto</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8">
                    <span className="leading-6 text-sm w-full">Perfecto para quienes recién empiezan y quieren explorar la plataforma.</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8">
                    <span className="leading-6 text-sm w-full">Desbloquea funcionalidades avanzadas y personaliza tu experiencia.</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8 border-r-2">
                    <span className="leading-6 text-sm w-full">Accede a todas nuestras funciones exclusivas y maximiza tu potencial como creador.</span>
                </div>
            </div>
            {/* Fila 3 */}
            <div className="flex">
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-l-2 flex items-center justify-center px-8">
                    <span className="w-full text-start">Aspecto</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8">
                    <span className="leading-6 text-sm w-full">Publica hasta 3 aplicaciones.</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8">
                    <span className="leading-6 text-sm w-full">Publica hasta 10 aplicaciones.</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 text-center flex items-center justify-center px-8 border-r-2">
                    <span className="leading-6 text-sm w-full">Publicaciones limitadas.</span>
                </div>
            </div>
            {/* Fila 4 */}
            <div className="flex">
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-l-2 flex items-center justify-center px-8">
                    <span className="w-full text-start leading-6">Análisis avanzado y personalización</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center flex items-center justify-center px-8"></div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center flex items-center justify-center px-8"></div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-r-2 flex items-center justify-center px-8"><CheckCircle className="h-10 w-10 text-primary-300" /></div>
            </div>
            {/* Fila 5 */}
            <div className="flex">
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center rounded-bl-lg border-l-2 border-b-2 flex items-center justify-center px-8">
                    <span className="w-full text-start">Soporte exclusivo 24/7</span>
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-b-2 flex items-center justify-center px-8"></div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center border-b-2 flex items-center justify-center px-8">
                    <CheckCircle className="h-10 w-10 text-primary-300" />
                </div>
                <div className="flex-1 w-[339px] h-[84px] border border-primary-300 p-4 text-center rounded-br-lg border-r-2 border-b-2 flex items-center justify-center px-8">
                    <CheckCircle className="h-10 w-10 text-primary-300" />
                </div>
            </div>
        </div>
    )
}

export default Table