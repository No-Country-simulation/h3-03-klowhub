import BreadCrumb from "@/components/breadcrumbs/breadcrumbs.component";
import Chat from "./components/chat/chat.component";

const ProjectChatPage = () => {
  return (
    <main className="container pb-6 flex flex-col">
      <BreadCrumb />
      <Chat />
    </main>
  )
};

export default ProjectChatPage
