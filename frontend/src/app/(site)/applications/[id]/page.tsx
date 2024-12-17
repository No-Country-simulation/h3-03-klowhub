import { ApplicationWithFullImgs } from "@/types/application.types";
import { AppDetail } from "../components/detail/app-detail.component";
import { Suspense } from "react";

const endpoint = process.env.NEXT_PUBLIC_APPLICATIONS_URL;

const getApplication = async (applicationId: string) => {
  const res = await fetch(`${endpoint}/${applicationId}?withAuthor=true`);
  const applicationData: ApplicationWithFullImgs = await res.json();

  return applicationData
};

type Props = {
  params: Promise<{
    id: string
  }>
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const application = await getApplication(id);

	return (
		<main>
      <Suspense>
        <AppDetail serverSideData={application} />
      </Suspense>
		</main>
	);
	
};

export default page;
