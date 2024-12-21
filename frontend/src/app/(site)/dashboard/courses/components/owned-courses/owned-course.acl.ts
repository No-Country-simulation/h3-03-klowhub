import { CourseWithFullAssets } from "@/types/courses.types";

export const transformCourse = (data: CourseWithFullAssets) => {
  return {
    id: data.id,
    title: data.title,
    coverImg: data.coverImg,
    shortDescription: data.shortDescription,
    platform: data.platform,
    tags: data.tags,
    price: data.price,
    fullDescription: data.fullDescription
  }   
};
