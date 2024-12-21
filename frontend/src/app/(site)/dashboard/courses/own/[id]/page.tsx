import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import { CourseViewer } from "../../components/owned-courses/course-viewer.section";
import { CourseWithFullAssets } from "@/types/courses.types";


const endpoint = process.env.NEXT_PUBLIC_COURSES_URL || "http://localhost:3000/api/courses";

const getCourse = async (courseId: string) => {

	const res = await fetch(`${endpoint}/${courseId}?withAuthor=true`);
	const courseData: CourseWithFullAssets = await res.json();

	return courseData;

}

type Props = {
	params: Promise<{
		id: string
	}>
}

const page = async ({ params }: Props) => {

	const { id } = await params;
	const course = await getCourse(id);

	return (
		<main>
			<BreadCrumb />

			<section className="mt-8">
				{/* <CourseViewer modules={module}/> */}
			</section>
		</main>
	);

};

export default page;