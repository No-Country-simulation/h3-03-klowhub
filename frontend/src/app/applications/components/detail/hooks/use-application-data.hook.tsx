import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { ApplicationCtx } from "@/app/dashboard/applications/new/context/application-form.context";

import { breakApplication } from "@/app/dashboard/applications/new/context/application-form.acl";
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
      const mockedData = window.sessionStorage.getItem("applicationForm"); // TODO: this should be the object retrieved from the api

      if (applicationContext) {
        // preview case
        console.log('getting data from course context...');
        const previewData = breakApplication(applicationContext.state)
        setPageData({ applicationData: previewData })

      } else if (mockedData) {
        // backend sends data case
        console.log('getting data from sessionStorage...');
        const parsedMockedData = JSON.parse(mockedData);
        setPageData({ applicationData: parsedMockedData })

      } else {
        // TEMPORARY mock case
        console.log('getting data from internal api...');
        const res = await fetch(`/api/applications/${params.id}?withAuthor=true&withReviews=true`);
        const data: ApplicationData = await res.json();
        setPageData(data)
      };
    })()
  }, [applicationContext, params.id])

  return { pageData, submitCourse: applicationContext?.submitApplication }
};

