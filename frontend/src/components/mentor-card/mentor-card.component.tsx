import Image from "next/image";
import { Card, CardContent } from "../ui/card"
import Icon from "../icon/icon.component";
import CountryFlag from "../country-flag/country-flag.component";
import { getSlug } from "@/utils/str.utils";
import { Badge } from "../ui/badge";
import { Inter } from 'next/font/google'
import Link from "next/link";
import { FC } from "react";
import { Mentor } from "./mentor-card.types";

const inter = Inter({
    subsets: ["latin"],
    weight: ["200", "400", "600", "700"],
    display: "swap",
});

const MentorCard: FC<Mentor> = ({
    firstName,
    lastName,
    img,
    nationality,
    platform,
    language,
    price,
    sessionCount,
    reviewCount
}
) => {
    return (
        <Card className={`${inter.className} overflow-hidden flex-col relative`}>
            <div className="h-60 w-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
                <Image
                    width={334}
                    height={205}
                    alt="some description"
                    src={img}
                    className="w-full h-full object-cover"
                />
                <button className="absolute top-1 right-3">
                    <Icon name="heart" />
                </button>
            </div>

            <CardContent className="flex flex-col gap-3 p-5 flex-grow">

                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <span className="text-sm font-[400] tracking-wider">{`${firstName} ${lastName}`}</span>
                        <CountryFlag nationality={nationality} />
                    </div>
                    <Icon name="more-vertical" />
                </div>


                <Badge
                    icon={<Icon name={getSlug(platform) === 'appsheet' ? 'app-sheet' : 'power-apps'} />}
                    className="bg-gray-200 text-white w-[144px]"
                >
                    {platform}
                </Badge>

                <div className="flex gap-3 text-sm font-[200] leading-[24px] tracking-wider underline-offset-auto decoration-skip-ink-auto text-left">
                    <Icon name="proyector" />
                    <span>{sessionCount} Sesiones</span>
                    <span>({reviewCount} reseñas)</span>
                </div>

                <span className="py-1 text-sm font-[200] leading-[24px] tracking-wider underline-offset-auto decoration-skip-ink-auto text-left">
                    {language === "spanish" && "Español"}
                </span>

                <span className="py-2.5 text-xl font-[700] leading-[24px] text-left">
                    {price}USD / Hora
                </span>

                <div className="w-full flex justify-center">
                    <Link className="font-[600] text-sm text-[#D194E2] tracking-wider w-[140px] py-2.5 flex justify-center" href={"#"}>Ver detalles</Link>
                </div>

            </CardContent>
        </Card>
    )
}

export default MentorCard
