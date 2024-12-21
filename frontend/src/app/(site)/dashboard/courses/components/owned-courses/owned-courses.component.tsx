import Icon from "@/components/icon/icon.component";
import { IconTypes } from "@/components/icon/icon.types";
import { TProductCard } from "@/components/product-card/product-card.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSlug } from "@/utils/str.utils";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type ProductCardProps = {
    data: TProductCard
}

export const OwnedCourses = ({ data }: ProductCardProps) => {

    const {
        id,
        title,
        coverImg,
        shortDescription,
        platform,
        tags
    } = data


    return (
        <Card className="overflow-hidden flex flex-col md:flex-row items-center gap-4 mb-6 h-full">
            <div className="flex-grow h-full w-full md:h-80 md:w-1/4 flex-shrink-0 overflow-hidden">
                <Image
                    width={coverImg.fileMetadata.width} height={coverImg.fileMetadata.height}
                    alt=""
                    src={coverImg.fileMetadata.url}
                    objectFit="cover"
                    className="h-full object-cover"
                />
            </div>
            <div className={`w-full flex flex-col gap-8 p-4`}>
                <CardHeader className="flex flex-col">
                    <div className="flex justify-between items-start gap-5">
                        <CardTitle className="leading-6">{title}</CardTitle>
                        <EllipsisVertical className="grow-0" />
                    </div>
                    <span className="text-sm tracking-wide leading-6">{shortDescription}</span>
                </CardHeader>

                <Badge
                    icon={<Icon name={getSlug(platform) as IconTypes} />}
                    className="bg-gray-100 text-white self-start"
                >
                    {platform}
                </Badge>

                <CardContent className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                        {
                            tags.map((t, idx) => (
                                <Badge className="py-2" key={`product-card-badge-${idx}`}>{t}</Badge>
                            ))
                        }
                    </div>
                </CardContent>

                <div>
                    <Link href={`/dashboard/courses/own/${id}`}  className="bg-primary-500 px-10 py-3 rounded-md">
                        Ir al Curso
                    </Link>
                </div>
            </div>
        </Card>
    )
};