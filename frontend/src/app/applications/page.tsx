import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";

const AppliactionsPage = () => {
  return (
    <main className="w-full">
      <div className="container px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <SearchFilter />

      <div 
        className="
        px-5 md:px-0
        grid grid-cols-1 gap-5
        md:grid-cols-3
        lg:grid-cols-4
        container
        mx-auto
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
