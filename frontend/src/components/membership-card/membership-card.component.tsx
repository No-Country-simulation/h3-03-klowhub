import { strForDisplay } from "@/utils/str.utils";
import Image from "next/image";

type Props = {
  tier: "starter" | "professional" | "expert"
}

const MembershipCard = ({ tier }: Props) => {

  return (
    <div className={`bg-gray-50 rounded-lg p-5`}>
      <div className="aspect-video overflow-hidden">
        <Image src={`/imgs/membership-${tier}.webp`} width={1024} height={1024} alt={`membership-${tier}`} className="object-center" />
      </div>
      <div>
        <span>{ strForDisplay(tier) }</span>
        <span>{ tier === "professional" ? "$9.99" : tier === "expert" ? "$9.99" : "Gratuito" }</span>
      </div>
      <ul>
        <li>Acceso limitado a funciones básicas.</li>
        <li>Ideal para principiantes que desean explorar la plataforma</li>
        <li>Soporte por correo electrónico.</li>
        <li>Uso de plantillas predefinidas y recursos básicos.</li>
      </ul>
      <span>Comisiones: PayPal 20%, Stripe 15%, Cripto 12%.</span>
    </div>
  )
};

export default MembershipCard
