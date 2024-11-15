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
      className={`overflow-hidden flex ${ orientation === "vertical" ? "flex-col" : "h-80 items-center gap-2" }`}
    >
      <div className={orientation === "vertical" ? "h-60" : "w-96 h-full"}>
        <Image width={334} height={205} alt="some description" src={ img } className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 p-5 flex-grow">
        <CardHeader className="flex flex-col">
          <div className="flex justify-between items-center">
            <CardTitle>{ title }</CardTitle>
            <Icon name="more-vertical" />
          </div>
        </CardHeader>
        <span className={`text-sm tracking-wide leading-6 ${orientation === "vertical" ? "h-[72px]" : ""}`}>
          {
            truncate(description, orientation === "horizontal" ? 200 : undefined) 
          }
        </span>
        <CardContent className="flex flex-col gap-3">
          <div>
            <Badge 
              icon={<Icon name={getSlug(platform) === 'appsheet' ? 'app-sheet' : 'power-apps'} />}
              className="bg-gray-100 text-white"
            >
              { platform }
            </Badge>
          </div>
          <div className="flex gap-2">
            {
              tags.map((t, idx) => (
                <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
              ))
            }
          </div>
          <Rating rating={rating} ratingCount={ratingCount} />
          <span className="text-xl font-bold">${ formatPrice(price) }</span>
          <div className="w-full flex justify-between items-center">
            <Button>Añadir al carrito</Button>
            <Link href="/" className="text-primary-200">Ver detalles</Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
};

export default ProductCard;
