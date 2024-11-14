import { FC } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import Image from "next/image";
import Link from "next/link";

import { Product } from "../product-card/product-card.types";
import Icon from "../icon/icon.component";
import { formatPrice } from "../product-card/product-card.utils";

import { ShoppingCart } from "lucide-react";

const CourseCard: FC<Product> = ({
    title,
    img,
    description,
    platform,
    tags,
    rating,
    ratingCount,
    price,
}) => {
    return (
        <Card className="w-full flex flex-col md:flex-row mb-6 bg-[#1F2937] border-none rounded-md shadow-lg gap-4">
            <div className="md:flex-shrink-0 overflow-hidden">
                <Image
                    width={334}
                    height={205}
                    objectFit="cover"
                    alt="some description"
                    src={img}
                    className="h-full w-full rounded-l-md sm:rounded-l-md"
                />
            </div>
            <div className="flex flex-col justify-evenly w-full p-4 md:p-0 space-y-4 md:space-y-0">
                <CardHeader className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-white">{title}</CardTitle>
                        <Icon style="text-white" name="more-vertical" />
                    </div>
                    <CardDescription className="text-white">{description}</CardDescription>
                </CardHeader>
                <div>
                    <Badge className="rounded-md py-1.5 text-white bg-[#FFFFFF1A] font-thin gap-2">
                        <Icon name="app-sheet" />
                        {platform}
                    </Badge>
                </div>
                <CardContent className="flex flex-col gap-4">

                    <div className="space-x-2">
                        {tags.map((t, idx) => (
                            <Badge key={`product-card-badge-${idx}`} className="rounded-md text-[#812AAC] bg-[#F3E3FBBF] border-none py-1.5" variant="outline">
                                {t}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex gap-4 border-white items-center">
                        <span className="text-white font-thin text-sm">{rating}</span>
                        <div className="relative">
                            <div className="flex">
                                {Array(5)
                                    .fill(0)
                                    .map((_, idx) => (
                                        <Icon key={`unrated-star-${idx}`} name="star" />
                                    ))}
                            </div>
                            <div className="flex absolute left-0 top-0">
                                {Array(Math.floor(rating))
                                    .fill(0)
                                    .map((_, idx) => (
                                        <Icon key={`rated-star-${idx}`} name="rated-star" />
                                    ))}
                            </div>
                        </div>
                        <span className="text-white font-thin text-sm">({ratingCount})</span>
                    </div>

                    {/* <span className="text-xl font-bold">{formatPrice(price)}</span> */}

                    <div className="w-full flex gap-10 items-center">
                        <Button className="bg-[#702486]" size="sm">
                            <ShoppingCart />
                            Añadir al carrito
                        </Button>
                        <Link className="text-[#D194E2]" href="/">Ver detalles</Link>
                    </div>
                </CardContent>
            </div>
        </Card>

    )
};

export default CourseCard;
