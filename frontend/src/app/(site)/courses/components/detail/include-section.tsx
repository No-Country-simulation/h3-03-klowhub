import Image from "next/image"
import { FC } from "react"

export const IncludeSection: FC = () => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">¿Qué incluye?</h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2 pl-4">
                {[
                    "Crear aplicaciones personalizadas desde cero utilizando Power Apps.",
                    "Casos de estudio y ejemplos reales para aplicar lo aprendido en situaciones concretas."
                ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-4">
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
    )
}
