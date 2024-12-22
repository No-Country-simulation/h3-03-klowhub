import { CourseDetail } from '../components/detail/course-detail.component';
import { SimilarCourses } from "../components/detail/similar-courses.section";
import { CourseWithFullAssets } from '@/types/courses.types';
import { IsClientProvider } from '@/contexts/is-client/is-client.context';

const endpoint = process.env.NEXT_PUBLIC_COURSES_URL;

const getCourse = async (courseId: string) => {
  const res = await fetch(`${endpoint}/${courseId}`);
  const applicationData: CourseWithFullAssets = await res.json();

  return applicationData
};

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
      <IsClientProvider>
        <CourseDetail serverSideData={course}>
          <SimilarCourses />
        </CourseDetail>
      </IsClientProvider>
        </main>
    );

};

export default page;
