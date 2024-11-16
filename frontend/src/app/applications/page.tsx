import ProductCard from "@/components/product-card/product-card.component";
import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import SearchFilter from "@/components/search-filter/search-filter.component";
import Pager from "@/components/pager/pager.component";

import { courses } from "@/mocks/products.mocks";

import { sector, plaform, language, functionalities, toolsAndPlatforms } from "@/consts/filters.consts";

const filters = [
  plaform,
  language,
  sector,
  functionalities,
  toolsAndPlatforms
];

const AppliactionsPage = () => {
  return (
    <main className="w-full">
      <div className="container px-6 md:px-0 mx-auto">
        <BreadCrumb />
      </div>

      <SearchFilter filters={filters} />

      <div 
        className="
        container px-5 grid grid-cols-1 gap-5 mx-auto
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
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
