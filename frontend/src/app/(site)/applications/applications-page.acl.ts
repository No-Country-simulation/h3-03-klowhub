import { BTAppWithAuthor, BTAuthor } from "@/types/backend-responses.types";
import { AuthorInfo } from "@/types/global.types";
import { strForDisplay } from "@/utils/str.utils";

export const transformAuthor = (data: BTAuthor): AuthorInfo => {
  const author = {
    name: strForDisplay(data.name),
    about: data.seller.about,
    profileImg: data.profileImg,
  };

  return author
};

export const transformApp = (data: BTAppWithAuthor) => {
  const app = {
    id: data.id,
    title: data.title,
    coverImg: data.coverImg,
    shortDescription: data.shortDescription,
    platform: data.platform,
    tags: data.tags,
    rating: data.rating,
    ratingCount: data.ratingCount,
    price: data.price,
    fullDescription: data.fullDescription,
    author: transformAuthor(data.author)
  };   

  return app
};
