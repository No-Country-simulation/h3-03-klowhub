import { TQuickView } from "../product-card/product-card.types";
import { getPathname, getQueryParams } from "@/utils/route.utils";
import { getProduct } from "@/utils/product.utils";
import Icon from "../icon/icon.component";
import { Badge } from "../ui/badge";
import { getSlug } from "@/utils/str.utils";
import Rating from "../rating/rating.component";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Video, Clock3 } from "lucide-react";
import { IconTypes } from "../icon/icon.types";
import { buttonVariants } from "../ui/button";

type Props = {
  products: TQuickView[]
}

const QuickView = async ({ products }: Props) => {
  const queryParams = await getQueryParams();
  const pathname = await getPathname();

  const currentProduct = getProduct<TQuickView>(products, queryParams.product)
  console.log('currentProduct: ', currentProduct);
  if (!currentProduct) return <div>No se encontro el curso</div>;

  const {
    id,
    title,
    shortDescription,
    platform,
    rating,
    ratingCount,
    author,
    video,
    coverImg
  } = currentProduct


  return (
    <div className="
      flex flex-col gap-5 px-5 overflow-scroll w-full
      md:w-[600px]
      2xl:w-[800px] 2xl:px-8
    ">
      <h2 className="font-bold">{title}</h2>
      <p>{shortDescription}</p>
      <div>
        <Badge
          icon={<Icon name={getSlug(platform) as IconTypes} />}
          className="bg-gray-100 text-white"
        >
          {platform}
        </Badge>
      </div>
      <div className="flex gap-5">
        <Rating rating={rating} ratingCount={ratingCount} />
        <span className="flex gap-2 items-center text-secondary-200">
          <Video size={24} strokeWidth={1} />
          {/* este texto es temporal */}
          18 videos
        </span>
        <span className="flex gap-2 items-center text-secondary-200">
          <Clock3 size={20} strokeWidth={1} />
          {/* este texto es temporal */}
          1.6 horas
        </span>
      </div>
      <div className="aspect-video overflow-hidden flex flex-col justify-center rounded-xl">
        { video
          ? <video controls>
            <source src={video.fileMetadata.url} type="video/mp4"></source>
          </video>
          : <Image 
            src={coverImg.fileMetadata.url}
            width={coverImg.fileMetadata.width}
            height={coverImg.fileMetadata.height}
            alt=""
          />
        }
      </div>
      <AuthorBlock author={author} />
      {/* <h2 className="font-bold">Acerca de este curso</h2> */}
      {/* <p>{author.about}</p> */}
      <div>
        <Link
          href={`${pathname}/${id}`}
          className={`
            ${buttonVariants({ variant: "outline" })}
            text-center px-8 py-2 border-primary-200 text-primary-100 font-bold bg-transparent hover:bg-primary-500
          `}
        >
          Ver detalles
        </Link>
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

const AuthorBlock = ({ author }: { author: TQuickView["author"] }) => {
  const { name, profileImg: { fileMetadata: { url, width, height } }, about } = author;
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        <Image src={url} width={width} height={height} alt=""></Image>
      </div>
      <blockquote className="flex flex-col">
        <cite className="font-bold not-italic">{name}</cite>
        <cite className="not-italic">{about}</cite>
      </blockquote>
    </div>
  )
};

export default QuickView
