"use client"

import contactsMock from "./chat-box.mock"
import Image from "next/image";
import ChatCard from "../chat-card/chat-card.component";
import { useSearchParams } from "next/navigation";
import MessageBox from "../message-box/message-box.component";
import { TImage } from "@/types/global.types";
import parse from "html-react-parser"
import { reactParserOptions } from "@/utils/component.utils";
import useSocket from "@/socket/use-socket.hook";
import { Input } from "@/components/ui/input";
import useStore from "@/contexts/store/use-store.hook";
import { BTUser } from "@/types/user.types";
import useLoadChats from "./hooks/use-load-chats.hook";
import useLoadMessages from "./hooks/use-load-messages.hook";
import { useEffect } from "react";
import { socket } from "@/socket/socket";

const ChatBox = () => {
  const [ user, _, isLoading ] = useStore<BTUser>("user");
  const searchParams = useSearchParams();
  const currentChat = searchParams.get("chatId");
  const chats = useLoadChats();
  const messagesPayload = useLoadMessages(currentChat);
  const [ messages ] = useSocket(messagesPayload);

  const selectedChat = chats.find(c => c.id === currentChat);

  useEffect(() => {
    socket.emit("joinChat", currentChat)
  }, [currentChat])

  return !isLoading && (
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
            chats.map((c, idx) => (
              <ChatCard 
                key={`contact-${idx}`} 
                id={c.id} 
                name={c.name} 
                profileImg={c.profileImg as TImage} 
                lastMessage={c.lastMessage} 
              />
            ))
          }
        </div>
      </div>
      <div className="w-3/4 h-full">
        <div className="h-20 border-b-1">
          <div className="w-2/3 flex p-3 gap-5">
            <div className="w-1/6">
              <Image src={ selectedChat?.profileImg.fileMetadata.url || contactsMock[0].profileImg.fileMetadata.url } width={50} height={50} alt="" />
            </div>
            <div className="flex flex-col space-y-1 items-start justify-center w-4/6 text-2xl">
              <span>{ selectedChat?.name }</span>
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>
        <div className="flex h-[520px]">
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-3 p-5 bg-[#F3F4F6] text-black grow w-full overflow-scroll">
              {
                messages.map((m, idx) => (
                  <div
                    key={`message-${idx}`}
                    className={
                      m.userId === user.id
                      ? "bg-primary-500 text-white p-3 rounded-lg w-3/4 ml-auto"
                      : "bg-gray-50 text-white p-3 rounded-lg w-3/4 mr-auto"
                      + " drop-shadow-xl"
                    }
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
          {/* <div className="w-1/3"></div> */}
        </div>
      </div>
    </div>
  )   
};

export default ChatBox
