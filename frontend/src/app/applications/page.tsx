import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";

const AppliactionsPage = () => {
  return (
    <main className="w-full">
      <div className="px-6 md:px-5 mx-auto">
        <BreadCrumb />
      </div>

      <SearchFilter />

      <div 
        className="
        grid grid-cols-4 gap-5
        2xl:grid-cols-3 2xl:px-5
        xl:grid-cols-2 
        sm:grid-cols-1
        "
      >
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

      <Pager/>
    </main>
  )
};

export default AppliactionsPage
