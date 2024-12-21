import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import ChatBox from "./components/chat-box/chat-box.component";
import { Suspense } from "react";

const ProjectChatPage = () => {
  return (
    <main className="container pb-6 flex flex-col">
      <BreadCrumb />
      <Suspense>
        <ChatBox />
      </Suspense>
    </main>
  )
};

export default ProjectChatPage
