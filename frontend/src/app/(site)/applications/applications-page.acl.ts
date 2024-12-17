import { TQuickView } from "@/components/product-card/product-card.types";
import { ApplicationWithFullImgs } from "@/types/application.types";
import { AuthorInfo } from "@/types/global.types";
import { BTUser } from "@/types/user.types";
import { strForDisplay } from "@/utils/str.utils";

export const transformAuthor = (data: BTUser): AuthorInfo => {
  const author = {
    name: strForDisplay(data.name),
    about: data.seller?.about || "",
    profileImg: data.profileImg,
  };

  return author
};

export const transformApp = (data: Required<ApplicationWithFullImgs>): TQuickView => {
  const app = {
    id: data.id,
    title: data.title,
    coverImg: data.coverImg,
    shortDescription: data.shortDescription,
    platform: data.platform!,
    tags: data.tags,
    // rating: data.rating,
    // ratingCount: data.ratingCount,
    price: data.price,
    fullDescription: data.fullDescription,
    author: { ...data.author, about: data.author.seller?.about || "" }
  };   

  return app
};
