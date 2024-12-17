import { TQuickView } from "@/components/product-card/product-card.types";
import { CourseWithFullAssets } from "@/types/courses.types";
import { RequiredProperty } from "@/types/utils.types";

export const transformBTCourse = (courseBT: RequiredProperty<CourseWithFullAssets>): TQuickView => {
  const courseFT = {
    ...courseBT,
    author: {
      ...courseBT.author,
      about: courseBT.author.seller.about
    }
  };

  return courseFT
};
