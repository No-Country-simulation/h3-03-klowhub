import SearchFilter from "@/components/search-filter/search-filter.component";
import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";
import { categories } from "@/mocks/categories.mocks";

import { sector, plaform, language, functionalities, toolsAndPlatforms, contentCore, level, contentType } from "@/consts/filters.consts";

const filters = [
  plaform,
  language,
  contentType,
  level,
  contentCore,
  sector,
  functionalities,
  toolsAndPlatforms
];

const Page = () => {
  return (
    <div>
      <div className="container px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <SearchFilter filters={filters} categories={categories} />

      <div className="container mx-auto px-6 md:px-0">
        {courses.map((course, index) => (
          <ProductCard
            title={course.title}
            img={course.img}
            description={course.description}
            platform={course.platform}
            tags={course.tags}
            rating={course.rating}
            ratingCount={course.ratingCount}
            price={course.price}
            key={index}
            orientation="horizontal"
          />
        ))}
      </div>
      <Pager />
    </div>
  );

};

export default Page;
