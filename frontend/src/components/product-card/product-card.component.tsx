import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TAppInfo } from "./product-card.types";
import { Button } from "@/components/ui/button"
import Icon from "../icon/icon.component";
import Rating from "../rating/rating.component";

import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "./product-card.utils";
import { getSlug, truncate } from "@/utils/str.utils";
import { headers } from "next/headers";

type ProductCardProps = {
  data: TAppInfo
}

const ProductCard = async ({ data }: ProductCardProps) => {
  const {
    id,
    title,
    img,
    description,
    platform,
    tags,
    rating,
    ratingCount,
    price,
  } = data
  const headerList = await headers();
  const pathname = headerList.get("x-current-path") || '/'; // Default to '/' if no path in headers
  const orientation = pathname === "/courses" ? "horizontal" : "vertical";

  return (
    <Card
      className={`overflow-hidden flex flex-col ${orientation === "vertical" ? "" : "md:flex-row items-center gap-4 mb-6"}`}
    >
      <div className={orientation === "vertical" ? "flex-shrink-0 h-60" : "h-full w-full md:h-auto md:w-auto flex-shrink-0 overflow-hidden"}>
        <Link href={{ pathname, query: `modal=true&product=${id}` }} scroll={false}>
            <Image 
              className="w-full h-full object-cover"
              width={img.width} height={img.height} 
              alt={img.alt}
              src={img.url} 
            />
        </Link>
      </div>
      <div className="w-full flex flex-col justify-evenly h-full gap-6 p-4 flex-grow">
        <CardHeader className="flex flex-col">
          <div className="flex justify-between items-center">
            <Link href={{ pathname, query: `modal=true&product=${id}` }} scroll={false}>
              <CardTitle>{title}</CardTitle>
            </Link>
            <Icon name="more-vertical" />
          </div>
          <Link href={{ pathname, query: `modal=true&product=${id}` }} scroll={false}>
            <span className={`text-sm tracking-wide leading-6 ${orientation === "vertical" ? "h-[72px]" : ""}`}>
              {
                truncate(description, orientation === "horizontal" ? 200 : undefined)
              }
            </span>
          </Link>
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
            <Link href="#" className="text-primary-200">Ver detalles</Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
};

export default ProductCard;
