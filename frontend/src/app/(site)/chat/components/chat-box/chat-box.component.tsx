"use client"

import contactsMock from "./chat-box.mock"
import Image from "next/image";
import ContactCard from "../contact-card/contact-card.component";
import { useSearchParams } from "next/navigation";
import MessageBox from "../message-box/message-box.component";
import { TImage } from "@/types/global.types";
import parse from "html-react-parser"
import { reactParserOptions } from "@/utils/component.utils";
import useSocket from "@/socket/use-socket.hook";
import ChatContact from "../chat-contact/chat-contact.component";
import { Input } from "@/components/ui/input";


const ChatBox = () => {
  const searchParams = useSearchParams();
  const currentUser = searchParams.get("user");
  const messages = useSocket();

  const selectedUser = contactsMock.find(u => u.id === currentUser);

  return (
    <div className="flex backdrop-blur-md bg-white/10 rounded-xl border-1 border-white h-[600px]">
      <div className="w-1/4">
        <div className="flex justify-center items-center h-20 border-r-1 font-bold">
          Mensajes
        </div>
        <div className="h-20 border-t-1 flex justify-center items-center">
          <Input
            className="w-full mx-5 border-0 text-white bg-white/20 placeholder:text-white"
            placeholder="Buscador"
          />
        </div>
        <div>
          {
            contactsMock.map((c, idx) => (
              <ContactCard key={`contact-${idx}`} id={c.id} name={c.name} profileImg={c.profileImg as TImage} messages={c.messages} />
            ))
          }
        </div>
      </div>
      <div className="w-3/4 h-full">
        <div className="h-20 border-b-1">
          <div className="w-2/3 flex p-3 gap-5">
            <div className="w-1/6">
              <Image src={ contactsMock[0].profileImg.fileMetadata.url} width={50} height={50} alt="" />
            </div>
            <div className="flex flex-col space-y-1 items-start w-4/6">
              <div>{ contactsMock[0].name }</div>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex h-full">
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col gap-5 p-5 bg-white text-black grow w-full overflow-scroll">
              {
                messages.map((m, idx) => (
                  <div
                    key={`message-${idx}`}
                    className="bg-gray-50 text-white p-3 rounded-md"
                  >
                    { parse(m.content, reactParserOptions) }
                  </div>
                ))
              }
            </div>
            <div className="">
              <MessageBox />
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  )   
};

export default ChatBox
