import { ApplicationFormData, ApplicationWithFullImgs } from "@/types/application.types";
import { useState, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import useIsClientCtx from "@/contexts/is-client/use-is-client.hook";
import { breakApplication } from "../../dashboard/applications/components/application-form/context/application-form.acl";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";

type Sources = {
  serverSideData?: ApplicationWithFullImgs
  clientSideData?: ApplicationFormData
}

const useApplicationData = ({ serverSideData, clientSideData }: Sources) => {
  const isClientCtx = useIsClientCtx();
  const [ applicationData, setApplicationData ] = useState<ApplicationWithFullImgs>()
  const [ user ] = useStore<BTUser>("user");

  const pathname = usePathname();
  const params = useParams();

  const applicationId = params.id;

  useEffect(() => {
    if (pathname.includes("/dashboard/applications/form") && clientSideData && isClientCtx) {
      setApplicationData({...breakApplication(clientSideData, false), author: user})
    };

    if (pathname === `/applications/${applicationId}`) {
      setApplicationData(serverSideData)
    };
  }, [applicationId, clientSideData, isClientCtx, pathname, serverSideData, user])

  return applicationData
};

export default useApplicationData
