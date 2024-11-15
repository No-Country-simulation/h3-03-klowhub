import SearchFilter from "@/components/search-filter/search-filter.component";
import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";
import { categories } from "@/mocks/categories.mocks";

const Page = () => {
  return (
    <div>
      <div className="px-6 md:px-5 mx-auto">
        <BreadCrumb />
      </div>

      <SearchFilter categories={categories} />

      <div className="flex flex-col gap-5 2xl:px-5">
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
      <Pager/>
    </div>
  );

};

export default Page;
