import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";

const AppliactionsPage = () => {
  return (
    <div className="w-full">
        <div>
          <div className="container px-6 md:px-0 mx-auto">
            <BreadCrumb />
          </div>

          <SearchFilter />

          <div className="grid grid-cols-4 gap-5">
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
                orientation="vertical"
              />
            ))}
          </div>

          <div className="container mx-auto flex items-center justify-center mb-8">
            <Pager/>
          </div>
        </div>
    </div>
  )
};

export default AppliactionsPage
