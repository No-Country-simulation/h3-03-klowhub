import { TAuthorInfo, TProduct } from "../product-card/product-card.types";
import { getQueryParams } from "@/utils/route.utils";
import { getProduct } from "@/utils/product.utils";
import Icon from "../icon/icon.component";
import { Badge } from "../ui/badge";
import { getSlug } from "@/utils/str.utils";
import Rating from "../rating/rating.component";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Video, Clock3 } from "lucide-react";

type QuickViewProps = {
  products: TProduct[]
}

type AuthorBlockProps = {
  author: TAuthorInfo
}

const QuickView = async ({ products }: QuickViewProps) => {
  const queryParams = await getQueryParams();

  const currentProduct = getProduct(products, Number(queryParams.product))
  if (!currentProduct) return <div>No se encontro el curso</div>;

  const {
  title,
  description,
  platform,
  rating,
  ratingCount,
  about,
  } = currentProduct.product


  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-bold">{ title }</h2>
      <p>{ description }</p>
      <div>
        <Badge
          icon={<Icon name={getSlug(platform) === 'appsheet' ? 'app-sheet' : 'power-apps'} />}
          className="bg-gray-100 text-white"
        >
          {platform}
        </Badge>
      </div>
      <div className="flex gap-5">
        <Rating rating={rating} ratingCount={ratingCount} />
        <span className="flex gap-2 items-center text-kSkyBlue">
          <Video size={24} strokeWidth={1} />
          {/* este texto es temporal */}
          18 videos
        </span>
        <span className="flex gap-2 items-center text-kSkyBlue">
          <Clock3 size={20} strokeWidth={1} />
          {/* este texto es temporal */}
          1.6 horas
        </span>
      </div>
      <video controls className="rounded-xl">
        <source src="/api/video" type="video/mp4"></source>
      </video>
      <AuthorBlock author={ currentProduct.author } />
      <h2 className="font-bold">Acerca de este curso</h2>
      <p>{ about }</p>
      <div>
        <Button className="text-center px-16 py-2 border-primary-200 text-primary-100 font-bold bg-transparent hover:bg-primary-500 outline outline-1">
          Ver detalles
        </Button>
      </div>
      <div className="flex gap-4 items-center">
        <span>Compartir</span>
        <div className="flex gap-2">
          <Link href="#"><Icon name="mail" /></Link>
          <Link href="#"><Icon name="whatsapp" /></Link>
          <Link href="#"><Icon name="messenger" /></Link>
          <Link href="#"><Icon name="linkedin" /></Link>
        </div>
      </div>
    </div>
  )
};

const AuthorBlock = ({ author }: AuthorBlockProps) => {
  const { name, img, about } = author;
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <Image src={ img.url } width={ img.width } height={ img.height } alt={ img.alt }></Image>
      </div>
      <blockquote className="flex flex-col">
        <cite className="font-bold not-italic">{ name }</cite>
        <cite className="not-italic">{ about }</cite>
      </blockquote>
    </div>
  )
};

export default QuickView
