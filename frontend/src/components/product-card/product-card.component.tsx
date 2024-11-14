import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import Image from "next/image";
import Link from "next/link";

import { Product } from "./product-card.types";
import Icon from "../icon/icon.component";
import { formatPrice } from "./product-card.utils";

const ProductCard: FC<Product> = ({ 
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
    <Card>
      <Image width={334} height={205} objectFit="" alt="some description" src={ img } />
      <div className="flex flex-col gap-3 p-4">
        <CardHeader className="flex flex-col">
          <div className="flex justify-between items-center">
            <CardTitle>{ title }</CardTitle>
            <Icon name="more-vertical" />
          </div>
          <CardDescription>{ description }</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <span>{ platform }</span>
          <div>
            {
              tags.map((t, idx) => (
                <Badge key={`product-card-badge-${idx}`} variant={"outline"}>{t}</Badge>
              ))
            }
          </div>
          <div className="flex gap-4">
            <span>{ rating }</span>
            <div className="relative">
              <div className="flex">{ Array(Math.floor(5)).fill(0).map((s, idx) => (
                <Icon key={`unrated-star-${idx}`} name="star" /> 
              )) }</div>
              <div className="flex absolute left-0 top-0">{ Array(Math.floor(rating)).fill(0).map((s, idx) => (
                <Icon key={`unrated-star-${idx}`} name="rated-star" />
              )) }</div>
            </div>
            <span>{ ratingCount }</span>
          </div>
          <span className="text-xl font-bold">{ formatPrice(price) }</span>
          <div className="w-full flex justify-between items-center">
            <Button>Añadir al carrito</Button>
            <Link href="/">Ver detalles</Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
};

export default ProductCard;
