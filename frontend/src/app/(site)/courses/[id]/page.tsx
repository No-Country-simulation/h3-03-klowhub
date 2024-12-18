import userMock from '@/mocks/user.mocks';
import { CourseDetail } from '../components/detail/course-detail.component';
import { SimilarCourses } from "../components/detail/similar-courses.section";
import { CourseWithFullAssets } from '@/types/courses.types';
import { BTSeller, BTUser } from '@/types/user.types';
import { IsClientProvider } from '@/contexts/is-client/is-client.context';

const endpoint = process.env.NEXT_PUBLIC_COURSES_URL;

const getCourse = async (applicationId: string) => {
  const res = await fetch(`${endpoint}/${applicationId}?withAuthor=true`);
  const applicationData: CourseWithFullAssets = await res.json();
  applicationData.author = userMock as Omit<BTUser, "seller"> & { seller: BTSeller }

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
