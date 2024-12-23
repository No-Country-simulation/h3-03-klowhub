import { useEffect, useState } from "react";
import { TProductCard } from "@/components/product-card/product-card.types";
import { CourseWithFullAssets } from "@/types/courses.types";

type UserContent = {
  applications: TProductCard[]
  courses: TProductCard[]
}

const useUserContent = () => {
  const [content, setContent] = useState<UserContent>({ applications: [], courses: [] });

  useEffect(() => {
    (async function () {
      const applicationsRes = await fetch('/api/applications');
      const { data: applications }: { data: CourseWithFullAssets[] } = await applicationsRes.json();
      const coursesRes = await fetch('/api/courses');
      const { data: courses }: { data: CourseWithFullAssets[] } = await coursesRes.json()

      const courseCards = courses.map((c) => {
        return {
          id: c.id,
          title: c.title,
          coverImg: c.coverImg,
          shortDescription: c.shortDescription,
          platform: c.platform,
          tags: c.tags,
          // rating: c.rating,
          // ratingCount: c.ratingCount,
          price: c.price,
          fullDescription: c.fullDescription
        }
      });

      const applicationCards = applications.map(a => {
        return {
          id: a.id,
          title: a.title,
          coverImg: a.coverImg,
          shortDescription: a.shortDescription,
          platform: a.platform,
          tags: a.tags,
          // rating: a.rating,
          // ratingCount: a.ratingCount,
          price: a.price,
          fullDescription: a.fullDescription
        }
      });

      // @ts-ignore: Unreachable code error
      setContent({ applications: applicationCards, courses: courseCards })
    })()
  }, [])

  return content
};

export default useUserContent
