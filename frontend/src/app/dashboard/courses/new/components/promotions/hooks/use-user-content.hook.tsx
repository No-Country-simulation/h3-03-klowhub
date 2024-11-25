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
          id: 0,
          title: c.title,
          img: c.img,
          description: c.about,
          platform: c.platform,
          tags: c.tags,
          rating: c.rating,
          ratingCount: c.ratingCount,
          price: c.price,
          about: c.about
        }
      });

      const applicationCards = applications.map(c => {
        return {
          id: 0,
          title: c.title,
          img: c.img,
          description: c.about,
          platform: c.platform,
          tags: c.tags,
          rating: c.rating,
          ratingCount: c.ratingCount,
          price: c.price,
          about: c.about
        }
      });

      setContent({ applications: applicationCards, courses: courseCards })
    })()
  }, [])

  return content
};

export default useUserContent
