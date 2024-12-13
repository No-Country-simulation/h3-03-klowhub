import ProductCard from "@/components/product-card/product-card.component";
import { TProductCard } from "@/components/product-card/product-card.types";


const getProducts = async (endpoint: string) => {
	const res = await fetch(endpoint, { cache: "force-cache" });
	const items: TProductCard[] = await res.json();
	return items
};

export const SimilarCourses = async () => {

	const courses = await getProducts(process.env.NEXT_PUBLIC_COURSES_URL as string);
  console.log('courses: ', courses);

	return (
		<div className="">
			<h3 className="text-sm font-semibold">Cursos similares</h3>
			<p className="text-gray-400 mb-8">También te pueden interesar estas lecciones y cursos</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{courses.slice(0, 3).map((c, idx) => (
					<ProductCard data={c} key={idx} />
				))}
			</div>
		</div>
	);
};
