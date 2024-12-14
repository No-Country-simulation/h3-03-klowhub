"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TProductCard } from "./product-card.types";
import { Button } from "@/components/ui/button"
import Icon from "../icon/icon.component";
import Rating from "../rating/rating.component";
import { EllipsisVertical } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "./product-card.utils";
import { getSlug, truncate } from "@/utils/str.utils";
import { IconTypes } from "../icon/icon.types";
import { usePathname } from "next/navigation";
import TempError from "../temp-error/temp-error.component";

type ProductCardProps = {
  data: TProductCard
  unlink?: boolean
  onlyInfo?: boolean
}

const ProductCard = ({ data, unlink, onlyInfo }: ProductCardProps) => {
  const {
    id,
    title,
    coverImg,
    shortDescription,
    platform,
    tags,
    rating,
    ratingCount,
    price,
  } = data

  const pathname = usePathname();
  const orientation = pathname === "/courses" ? "horizontal" : "vertical";

  return (
    <Card
      className={`
        overflow-hidden flex flex-col
        ${orientation === "vertical" ? "h-full" : "md:flex-row items-center gap-4 mb-6 h-full flex-grow"}
      `}
    >
      <div className={orientation === "vertical" ? "flex-shrink-0 h-60" : "flex-grow h-full w-full md:h-80 md:w-1/4 flex-shrink-0 overflow-hidden"}>
        <Link 
          href={{ pathname, query: `modal=true&product=${id}` }}
          scroll={false} 
          className={`
            ${unlink ? "pointer-events-none" : ""}
          `}
        >
          { coverImg ?
            <Image 
              width={coverImg.fileMetadata.width} height={coverImg.fileMetadata.height} 
              alt=""
              src={coverImg.fileMetadata.url} 
              objectFit="cover"
              className="h-full object-cover" 
            /> : <TempError element="imagen de portada" reason="la imagen es indefinida" />
          }
        </Link>
      </div>
      <div className={`
        w-full flex flex-col justify-between h-full gap-6 p-4 
      `}>
        <CardHeader className="flex flex-col">
          <div className="flex justify-between items-start gap-5">
            <Link 
              href={{ pathname, query: `modal=true&product=${id}` }} 
              scroll={false} 
              className={`
                ${unlink ? "pointer-events-none flex-1" : ""}
              `}
            >
              <CardTitle className="leading-6">{ title }</CardTitle>
            </Link>
            <EllipsisVertical className="grow-0" />
          </div>
          <Link href={{ pathname, query: `modal=true&product=${id}` }} scroll={false} className={ unlink ? "pointer-events-none" : "" }>
            <span className={`text-sm tracking-wide leading-6 ${orientation === "vertical" ? "h-[72px]" : ""}`}>
              {
                truncate(shortDescription, orientation === "horizontal" ? 200 : 80)
              }
            </span>
          </Link>
        </CardHeader>

        <div className="flex flex-col gap-5">
          <Badge
            icon={<Icon name={platform as IconTypes} />}
            className="bg-gray-100 text-white self-start"
          >
            {platform}
          </Badge>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {
                tags.map((t, idx) => (
                  <Badge key={`product-card-badge-${idx}`}>{t}</Badge>
                ))
              }
            </div>
            { !onlyInfo && <Rating rating={4.5} ratingCount={16} />}
            { !onlyInfo && orientation === "vertical" ? <span className="text-xl font-bold">${formatPrice(price)}</span> : "" }
            { !onlyInfo &&
              <div className={`w-full flex items-center ${orientation === "vertical" ? "justify-between" : "justify-between md:justify-start gap-10"}`}>
                <Button>Añadir al carrito</Button>
                <Link href={`${pathname === '/courses' ? "/courses" : "/applications"}/${id}`} className={`text-primary-200 ${ unlink ? "pointer-events-none" : "" }`} >Ver detalles</Link>
              </div>
            }
          </CardContent>
        </div>
      </div>
    </Card>
  )
};

export default ProductCard;
