import ProductCard from "@/components/product-card/product-card.component";
import { TProduct } from "@/components/product-card/product-card.types";

const endpoint = "http://localhost:3000/api/products";

const getProducts = async (endpoint: string) => {
	const res = await fetch(endpoint, { cache: "force-cache" });
	const items: { data: TProduct[] } = await res.json();
	return items
};

export const SimilarCourses = async () => {

	const products = await getProducts(endpoint);

	return (
		<div className="">
			<h3 className="text-sm font-semibold">Cursos similares</h3>
			<p className="text-gray-400 mb-8">También te pueden interesar estas lecciones y cursos</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.data.slice(0, 3).map((c, idx) => (
					<ProductCard data={c.product} key={idx} />
				))}
			</div>
		</div>
	);
};
