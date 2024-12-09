import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { AppDetail } from "../components/detail/app-detail.component";

const page = () => {

	return (
		<main>
			<BreadCrumb />

			<AppDetail />
		</main>
	);
	
};

export default page;