import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "./product-card.types";
import { Button } from "@/components/ui/button"
import Icon from "../icon/icon.component";
import Rating from "../rating/rating.component";

import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "./product-card.utils";
import { getSlug, truncate } from "@/utils/str.utils";

const ProductCard: FC<Product> = ({
  title,
  img,
  description,
  platform,
  tags,
  rating,
  ratingCount,
  price,
  orientation
}) => {
  return (
    <Card
      className={`overflow-hidden flex flex-col ${orientation === "vertical" ? "" : "md:flex-row items-center gap-4 mb-6"}`}
    >
      <div className={orientation === "vertical" ? "flex-shrink-0 h-60" : "h-full w-full md:h-auto md:w-auto flex-shrink-0 overflow-hidden"}>
        <Image 
          className="w-full h-full object-cover"
          width={img.width} height={img.height} 
          alt={img.alt}
          src={img.url} 
        />
      </div>
      <div className="w-full flex flex-col justify-evenly h-full gap-6 p-4 flex-grow">
        <CardHeader className="flex flex-col">
          <div className="flex justify-between items-center">
            <CardTitle>{title}</CardTitle>
            <Icon name="more-vertical" />
          </div>
          <span className={`text-sm tracking-wide leading-6 ${orientation === "vertical" ? "h-[72px]" : ""}`}>
            {
              truncate(description, orientation === "horizontal" ? 200 : undefined)
            }
          </span>
        </CardHeader>

        <div>
          <Badge
            icon={<Icon name={getSlug(platform) === 'appsheet' ? 'app-sheet' : 'power-apps'} />}
            className="bg-gray-100 text-white"
          >
            {platform}
          </Badge>
        </div>
        <CardContent className="flex flex-col gap-3">
          <div className="flex gap-2">
            {
              tags.map((t, idx) => (
                <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
              ))
            }
          </div>
          <Rating rating={rating} ratingCount={ratingCount} />
          {orientation === "vertical" ? <span className="text-xl font-bold">${formatPrice(price)}</span> : ""}
          <div className={`w-full flex items-center ${orientation === "vertical" ? "justify-between" : "justify-between md:justify-start gap-10"}`}>
            <Button>Añadir al carrito</Button>
            <Link href="/" className="text-primary-200">Ver detalles</Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
};

export default ProductCard;
