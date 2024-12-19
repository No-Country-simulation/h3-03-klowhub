import { strForDisplay } from "@/utils/str.utils";
import Image from "next/image";

type Props = {
    tier: "starter" | "professional" | "expert";
};

const MembershipCard = ({ tier }: Props) => {
    return (
        <div
            className={`w-[320px] lg:w-full bg-white/10 md:bg-gray-50 rounded-lg pb-8 lg:pt-3 lg:px-3 flex flex-col gap-10 transition-transform duration-300 hover:-translate-y-3 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.4)]`}
        >
            <div className="aspect-video overflow-hidden rounded-lg">
                <Image
                    src={`/imgs/membership-${tier}.webp`}
                    width={1024}
                    height={1024}
                    alt={`membership-${tier}`}
                    className="object-center -mt-10"
                />
            </div>
            <div className="flex flex-col gap-1 px-3 lg:px-0">
                <span className="text-base font-bold">{strForDisplay(tier)}</span>
                <span className="text-base font-bold">
                    {tier === "professional"
                        ? "$9.99"
                        : tier === "expert"
                            ? "$9.99"
                            : "Gratuito"}
                </span>
            </div>
            <ul className="flex flex-col gap-1 px-3 lg:px-0">
                <li className="text-sm py-1 flex items-center gap-2 whitespace-normal">
                    <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                    Acceso limitado a funciones básicas.
                </li>
                <li className="text-sm py-1 flex items-center gap-2 whitespace-normal">
                    <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                    Ideal para principiantes que desean explorar la plataforma
                </li>
                <li className="text-sm py-1 flex items-center gap-2 whitespace-normal">
                    <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                    Soporte por correo electrónico.
                </li>
                <li className="text-sm py-1 flex items-center gap-2 whitespace-normal">
                    <div className="w-2 h-2 rounded-full bg-primary-200"></div>
                    Uso de plantillas predefinidas y recursos básicos.
                </li>
            </ul>
            <span className="text-sm whitespace-normal px-3 lg:px-0">Comisiones: PayPal 20%, Stripe 15%, Cripto 12%.</span>
        </div>
    );
};

export default MembershipCard;
