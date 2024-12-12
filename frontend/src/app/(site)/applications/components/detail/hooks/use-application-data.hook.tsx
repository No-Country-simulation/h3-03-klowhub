import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { ApplicationCtx } from "@/app/(site)/dashboard/applications/new/context/application-form.context";

import { breakApplication } from "@/app/(site)/dashboard/applications/new/context/application-form.acl";
import { Application } from "@/types/application.types";

type ApplicationData = {
  applicationData: Application
}

export const useApplicationData = () => {
  const [ pageData, setPageData ] = useState<ApplicationData>();
  const applicationContext = useContext(ApplicationCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      // const mockedData = window.sessionStorage.getItem("applicationForm"); // TODO: this should be the object retrieved from the api
      // console.log('mockedData: ', mockedData);

      if (applicationContext) {
        // preview case
        console.log('getting data from course context...');
        const previewData = breakApplication(applicationContext.state)
        setPageData({ applicationData: previewData })

      } else {
        // TEMPORARY mock case
        console.log('getting data from internal api...');
        // const res = await fetch(`/api/applications/${params.id}?withAuthor=true&withReviews=true`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${params.id}?withAuthor=true&withReviews=true`);
        const data: ApplicationData = await res.json();
        // console.log('data: ', data);
        setPageData(data)
      };
    })()
  }, [applicationContext, params.id])

  return { pageData, submitApplication: applicationContext?.submitApplication }
};


