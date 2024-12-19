import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import ChatBox from "./components/chat-box/chat-box.component";

const ProjectChatPage = () => {
  return (
    <main className="container pb-6 flex flex-col">
      <BreadCrumb />
      <ChatBox />
    </main>
  )
};

export default ProjectChatPage
