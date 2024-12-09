import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card/product-card.types";
import { Course } from "@/types/courses.types";

type UserContent = {
  applications: ProductCard[]
  courses: ProductCard[]
}

const useUserContent = () => {
  const [ content, setContent ] = useState<UserContent>({ applications: [], courses: [] });

  useEffect(() => {
    (async function () {
      const applicationsRes = await fetch('/api/applications');
      const { data: applications }: { data: Course[] } = await applicationsRes.json();
      const coursesRes = await fetch('/api/courses');
      const { data: courses }: { data: Course[] } = await coursesRes.json()

      const courseCards = courses.map((c) => {
        return {
          id: c.id,
          title: c.title,
          coverImg: c.coverImg,
          shortDescription: c.shortDescription,
          platform: c.platform,
          tags: c.tags,
          rating: c.rating,
          ratingCount: c.ratingCount,
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
          rating: a.rating,
          ratingCount: a.ratingCount,
          price: a.price,
          fullDescription: a.fullDescription
        }
      });
      console.log('applicationCards: ', applicationCards);

      setContent({ applications: applicationCards, courses: courseCards })
    })()
  }, [])

  return content
};

export default useUserContent
