import { AppDetail } from "../components/detail/app-detail.component";
import { Suspense } from "react";

const page = () => {

	return (
		<main>
      <Suspense>
        <AppDetail />
      </Suspense>
		</main>
	);
	
};

export default page;
