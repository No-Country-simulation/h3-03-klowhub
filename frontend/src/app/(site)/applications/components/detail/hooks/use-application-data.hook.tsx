import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { ApplicationCtx } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.context";

import { breakApplication } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.acl";
import { Application, ApplicationWithAuthor } from "@/types/application.types";
import { transformAuthor } from "../../../applications-page.acl";
import { BTApplicationWithAuthor } from "@/types/backend-responses.types";

export const useApplicationData = () => {
  const [ pageData, setPageData ] = useState<Application | ApplicationWithAuthor>();
  const applicationContext = useContext(ApplicationCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      if (applicationContext) {
        console.log('getting data from course context...');
        const previewData = breakApplication(applicationContext.state, false)
        // TODO: add author info from global store
        setPageData({ ...previewData })

      } else {
        console.log('getting data from internal api...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${params.id}?withAuthor=true&withReviews=true`);
        const data: BTApplicationWithAuthor = await res.json();
        const transformedApp = {
          ...data,
          author: transformAuthor(data.author)
        }
        setPageData(transformedApp)
      };
    })()
  }, [applicationContext, params.id])

  return { pageData, submitApplication: applicationContext?.submitApplication }
};


