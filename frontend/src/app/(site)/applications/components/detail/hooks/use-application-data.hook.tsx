import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { ApplicationCtx } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.context";

import { breakApplication } from "@/app/(site)/dashboard/applications/components/application-form/context/application-form.acl";
import { Application } from "@/types/application.types";
import { RequiredProperty } from "@/types/utils.types";

// type ApplicationPayload = RequiredProperty<Omit<Application, "promotion">> & Application["promotion"]

export const useApplicationData = () => {
  const [ pageData, setPageData ] = useState<Application>();
  const applicationContext = useContext(ApplicationCtx);
  const params = useParams();

  useEffect(() => {
    (async function () {
      if (applicationContext) {
        console.log('getting data from course context...');
        const previewData = breakApplication(applicationContext.state, false)
        setPageData({ ...previewData })

      } else {
        console.log('getting data from internal api...');
        const res = await fetch(`${process.env.NEXT_PUBLIC_APPLICATIONS_URL}/${params.id}?withAuthor=true&withReviews=true`);
        const data: Application = await res.json();
        setPageData(data)
      };
    })()
  }, [applicationContext, params.id])

  return { pageData, submitApplication: applicationContext?.submitApplication }
};


